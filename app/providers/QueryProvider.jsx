//
// https://react-query.tanstack.com/quick-start
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
//
const client_ = new QueryClient({
  queryCache: new QueryCache(),
});
//
export default function QueryProvider({ children }) {
  return <QueryClientProvider client={client_}>{children}</QueryClientProvider>;
}

