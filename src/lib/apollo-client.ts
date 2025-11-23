import { ApolloClient, ApolloLink, InMemoryCache, split } from '@apollo/client';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import toast from 'react-hot-toast';
import { env } from './env';
import { ErrorLink } from '@apollo/client/link/error';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const inMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        listings: {
          // Include targetCurrency in cache key so each currency preference gets its own cache entry
          // The base prices stay the same, but convertedPrices field differs per targetCurrency
          keyArgs: (args) => {
            const filters = args?.filters || {};
            return `listings:${filters.status || ''}:${filters.targetCurrency || ''}:${filters.sortBy || ''}`;
          },
          merge(existing, incoming) {
            // Always replace with incoming data (no pagination merging for now)
            return incoming;
          },
        },
      },
    },
    Listing: {
      fields: {
        bids: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const uploadLink = createUploadLink({
  uri: env.graphqlUrl,
  credentials: 'include',
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, extensions }) => {
      if (extensions?.code === 'UNAUTHENTICATED') {
        // Try to refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          // TODO: Implement token refresh
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      } else {
        toast.error(message);
      }
    });
  }
  // Log the error for any unhandled GraphQL errors or network errors.
  console.log(`[Error]: ${error.message}`);
  // If nothing is returned from the error handler callback, the error will be
  // emitted from the link chain as normal.
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: env.wsUrl,
    connectionParams: () => {
      const token = localStorage.getItem('accessToken');
      return {
        authorization: token ? `Bearer ${token}` : '',
      };
    },
    on: {
      connected: () => console.log('WebSocket connected'),
      error: (error) => console.error('WebSocket error:', error),
    },
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  ApolloLink.from([errorLink, authLink, uploadLink as unknown as ApolloLink]),
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: inMemoryCache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});