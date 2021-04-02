import { ThemeProvider } from "@ui5/webcomponents-react";
import React, { useEffect, useState } from "react";
import "./App.css";
import EntityList from "./pages/EntityList/EntityList.component";

export const OdataContext = React.createContext({});

export default function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    const handshake = async () => {
      const response = await fetch(
        "/sap/opu/odata/sap/ZAPI_UK31680_TESTTABLE/",
        {
          method: "HEAD",
          headers: {
            "x-csrf-token": "Fetch",
          },
        }
      );
      setToken(response.headers.get("x-csrf-token"));
    };
    handshake();
  }, []);

  return (
    <OdataContext.Provider value={{ token }}>
      <ThemeProvider>
        <EntityList />
      </ThemeProvider>
    </OdataContext.Provider>
  );
}
