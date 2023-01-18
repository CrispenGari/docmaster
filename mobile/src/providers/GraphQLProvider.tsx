import { createUploadLink } from "apollo-upload-client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { uri } from "../constants";
const link = createUploadLink({ uri });
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

interface Props {
  children: React.ReactNode;
}
const GraphQLProvider: React.FunctionComponent<Props> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphQLProvider;
