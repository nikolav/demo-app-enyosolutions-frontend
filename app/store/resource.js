import { useEffect, useState, createContext, useContext } from "react";
import useQueryArticles from "../../src/hooks/use-query-resource";

//
const ArticlesContext = createContext();
//
export const useArticles = () => useContext(ArticlesContext);
////
////
export default function ArticlesProvider({ children }) {
  const [articles, setArticles] = useState(null);
  const query = useQueryArticles();
  //
  useEffect(() => {
    if (!query.isLoading && query.error) return;
    if (!query.isLoading && !query.error && query.data)
      setArticles(query.data.data);
  }, [query.error, query.isLoading, query.data?.data]);
  //
  const valueArticles = { articles, query };
  //
  return (
    <ArticlesContext.Provider value={valueArticles}>
      {children}
    </ArticlesContext.Provider>
  );
}
