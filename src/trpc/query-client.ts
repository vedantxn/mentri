import {
    defaultShouldDehydrateQuery,
    QueryClient,
  } from '@tanstack/react-query';
  import superjson from 'superjson';
  /**
   * Create a QueryClient configured with application-default React Query options.
   *
   * The client sets queries to a 30-second stale time and de/rehydration behavior
   * that treats queries as dehydrated when React Query's default check passes or
   * when a query's state.status is `'pending'`.
   *
   * @returns A QueryClient configured with the described default options.
   */
  export function makeQueryClient() {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30 * 1000,
        },
        dehydrate: {
          // serializeData: superjson.serialize,
          shouldDehydrateQuery: (query) =>
            defaultShouldDehydrateQuery(query) ||
            query.state.status === 'pending',
        },
        hydrate: {
          // deserializeData: superjson.deserialize,
        },
      },
    });
  }