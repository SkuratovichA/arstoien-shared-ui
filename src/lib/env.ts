/**
 * Type-safe environment variables for shared-ui
 *
 * This module provides environment variable access for the shared-ui package.
 * Consumer applications should provide their own env configuration.
 */

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_URL?: string;
  readonly VITE_WS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

function getEnvVar(key: keyof ImportMetaEnv, defaultValue: string): string {
  return import.meta.env[key] || defaultValue;
}

/**
 * Environment variables used by shared-ui components
 */
export const env = {
  graphqlUrl: getEnvVar('VITE_GRAPHQL_URL', 'http://localhost:4000/graphql'),
  wsUrl: getEnvVar('VITE_WS_URL', 'ws://localhost:4000/graphql'),
} as const;

export type Env = typeof env;
