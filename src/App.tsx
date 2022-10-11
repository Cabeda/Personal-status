import React from "react";
import axios from "axios";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import styled, { ThemeProvider } from "styled-components";

const queryClient = new QueryClient();

const setColorByStatus = (data: string): string => {
  switch (data) {
    case "busy":
      return "red";
    case "available":
      return "green";
    default:
      return "yellow";
  }
};

const DIV = styled.div`
  font-size: 12px;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => setColorByStatus(props.theme.status)};
`;

function Status() {
  const [status, setStatus] = React.useState<string>("");

  useQuery(
    "todos",
    async () => {
      const { data } = await axios.get(
        "https://patchbay.pub/pubsub/cabeda-status"
      );
      setStatus(data.toString());
      return data;
    },
    {
      // Refetch the data every second
      refetchInterval: 100,
    }
  );

  const theme = {
    status: status,
  };

  return (
    <ThemeProvider theme={theme}>
      <DIV></DIV>
    </ThemeProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Status></Status>;
    </QueryClientProvider>
  );
}

export default App;
