declare module 'apollo-upload-client/UploadHttpLink.mjs' {
  import type { ApolloLink } from '@apollo/client';

  interface UploadHttpLinkOptions {
    uri?: string;
    credentials?: string;
    headers?: Record<string, string>;
    fetch?: typeof fetch;
    includeExtensions?: boolean;
  }

  export default class UploadHttpLink extends ApolloLink {
    constructor(options?: UploadHttpLinkOptions);
  }
}
