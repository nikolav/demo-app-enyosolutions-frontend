import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { stripEndSlashes } from "../util";
//
export const URL_LOCAL = "https://demo-enyosolutions.herokuapp.com/api";
export const ARTICLES = "articles";
//
export const DEFAULT_QUERY_CONFIG = {
  // refresh data on every window focus
  refetchOnWindowFocus: true,
  //   refetchOnMount: bool,
  //   refetchOnReconnect: bool,

  // how oftern to refetch data
  staleTime: 56789, // [0], `Infinity`: fresh forever, refetch manually

  // ttl for cached/hiden query for memcached data thats not displaying
  cacheTime: 12 * 60 * 1000, // in ms; `Infinity` doesnt gc queries

  // how many times to retry failed query
  retry: false, // number | boolean | 0 [3]
  // retryDelay: number [sec] | func

  //  enable dependent queries;
  //    allow query to run after prev. data has been fetched
  //  run q query if other data is available
  //  dependent queries start in .isIdle state
  enabled: true,

  // use existing query data seed
  // initialData: any,
  // ..start with exisiting cache if any;
  // @deprecated
  // initialData: () => qCache.findAll(ARTICLES),
  // show initial data but fetch on component mount
  initialStale: true,

  //   • access RQ cache
  //   queryCache {
  //   .getQueryData(query: string): data[]
  //   .setQueryData(key: [string, data-ID], data: object)
  //   .invalidateQueries(key: string|array, [opts])
  //     // with .refetchActive=true opt: mark queries as stale for next refetch
  //   preload data imperatively wihout any user actions taken,
  //   populate cache with some predicted/popular data to show,
  //     or .onHover to populate page data
  //   .prefetchQuery([key,id], fetcher: ()=>void, [opts]); can take options same as .useQuery
  // }

  // poll interval [ms]
  refetchInterval: 67890,
  //
  //  onSuccess: (data) => null,
  //  onError: (error) => null,
  //  onSettled: (data, error) => null,

  // prepopulate its cache if empty
  // with placeholder, partial or incomplete data
  // it doesnt cache this data like .initialData
  // .. can pass memozed function to calc. data upfront
  // .placeholderData
};
//
//
export function useQueryResource(resource, config = {}) {
  const queryClient = useQueryClient();
  // .invalidateQueries(<key>)
  // .prefetchQuery(<key>, <fetch>)
  // .setQueryData(<key>, <data>)
  //
  return useQuery(
    resource,
    (_queryKey) =>
      axios
        .get(`${stripEndSlashes(URL_LOCAL)}/${resource}`)
        .then(({ data }) => ({ data: data.articles })),
    {
      ...DEFAULT_QUERY_CONFIG,
      initialData: () => queryClient.getQueryData(resource),
      ...config,
    }
  );
}
////
////
export default function useQueryArticles(config) {
  return useQueryResource(ARTICLES, config);
}
