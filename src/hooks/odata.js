import { useState, useContext, useEffect } from "react";
import { OdataContext } from "../App";

const TEST_ENTITY_PATH = "/sap/opu/odata/sap/ZAPI_UK31680_TESTTABLE/TestEntity";

export const useRefresh = () => {
  const { token } = useContext(OdataContext);
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const response = await fetch(TEST_ENTITY_PATH, {
        method: "GET",
        headers: {
          "x-crsf-token": token,
          "content-type": "application/json",
          accept: "application/json",
        },
      });
      const json = await response.json();
      setEntities(json.d.results);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  return [refresh, entities, loading];
};

export const useLoadData = () => {
  const { token } = useContext(OdataContext);
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refresh = async () => {
      try {
        const response = await fetch(TEST_ENTITY_PATH, {
          method: "GET",
          headers: {
            "x-crsf-token": token,
            "content-type": "application/json",
            accept: "application/json",
          },
        });
        const json = await response.json();
        setEntities(json.d.results);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        throw e;
      }
    };
    if (token) refresh();
  }, [token]);

  return [entities, loading];
};

export const useCreate = () => {
  const { token } = useContext(OdataContext);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState();
  const [refresh] = useRefresh();

  const create = async entity => {
    try {
      const response = await fetch(TEST_ENTITY_PATH, {
        method: "POST",
        headers: {
          "x-crsf-token": token,
          "content-type": "application/json",
          accept: "application/json",
        },
        body: entity,
      });
      const json = await response.json();
      setResult(json.d);
      setLoading(false);
      refresh();
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  return [create, result, loading];
};
