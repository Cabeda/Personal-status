import React, { useContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import styled, { ThemeContext } from "styled-components";

function App() {
  const [value, setValue] = React.useState<string>("");

  const { status, data, error } = useQuery(
    "todos",
    async () => {
      const { data } = await axios.get(
        "https://patchbay.pub/pubsub/cabeda-status"
      );
      setValue(data.toString());
      return data;
    },
    {
      // Refetch the data every second
      refetchInterval: 1000,
    }
  );

  const DIV = styled.div`
    font-size: 12px;
    width: 100vw;
    height: 100vh;
    background-color: ${() => setColorByStatus(value)};
  `;

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

  return (
      <DIV></DIV>
  );
}

export default App;
