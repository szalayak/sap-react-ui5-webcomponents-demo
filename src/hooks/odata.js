import { useState, useContext, useCallback } from "react";
import { OdataContext } from "../App";

const SERVICE_PATH = "/sap/opu/odata/sap/ZAPI_UK31680_TESTTABLE";
const TEST_ENTITY_PATH = `${SERVICE_PATH}/TestEntity`;

const createHeaders = (token, entity) => ({
  "x-csrf-token": token,
  "content-type": "application/json",
  accept: "application/json",
  "If-Match": entity?.__metadata?.etag,
});

export const useRefresh = () => {
  const { token } = useContext(OdataContext);
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(TEST_ENTITY_PATH, {
        method: "GET",
        headers: createHeaders(token),
      });
      const json = await response.json();
      setEntities(json.d.results);
      setError();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  }, [token]);

  return {
    refresh,
    entities,
    entitiesLoading: loading,
    refreshError: error,
  };
};

export const useCreate = () => {
  const { token } = useContext(OdataContext);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [error, setError] = useState();

  const create = useCallback(
    async entity => {
      try {
        setLoading(true);
        const response = await fetch(TEST_ENTITY_PATH, {
          method: "POST",
          headers: createHeaders(token),
          body: JSON.stringify(entity),
        });
        const json = await response.json();
        setResult(json.d);
        setError();
        setLoading(false);
        return json.d;
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    },
    [token]
  );

  return {
    create,
    createdEntity: result,
    createLoading: loading,
    createError: error,
  };
};

export const useActivate = () => {
  const { token } = useContext(OdataContext);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [error, setError] = useState();

  const activate = useCallback(
    async entity => {
      try {
        setLoading(true);
        const response = await fetch(
          `${SERVICE_PATH}/TestEntityActivate?Id=guid'${entity.Id}'&IsActiveEntity=${entity.IsActiveEntity}`,
          {
            method: "POST",
            headers: createHeaders(token),
          }
        );
        const json = await response.json();
        setResult(json.d);
        setError();
        setLoading(false);
        return json.d;
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    },
    [token]
  );

  return {
    activate,
    activeEntity: result,
    activateLoading: loading,
    activateError: error,
  };
};

export const useDelete = () => {
  const { token } = useContext(OdataContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const deleteEntity = useCallback(
    async entity => {
      try {
        setLoading(true);
        await fetch(
          `${SERVICE_PATH}/TestEntity(Id=guid'${entity.Id}',IsActiveEntity=${entity.IsActiveEntity})`,
          {
            method: "DELETE",
            headers: createHeaders(token, entity),
          }
        );
        setError();
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    },
    [token]
  );

  return {
    deleteEntity,
    deleteLoading: loading,
    deleteError: error,
  };
};

export const useEdit = () => {
  const { token } = useContext(OdataContext);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [error, setError] = useState();

  const edit = useCallback(
    async entity => {
      try {
        setLoading(true);
        const response = await fetch(
          `${SERVICE_PATH}/TestEntityEdit?Id=guid'${entity.Id}'&IsActiveEntity=${entity.IsActiveEntity}`,
          {
            method: "POST",
            headers: createHeaders(token, entity),
          }
        );
        const json = await response.json();
        setResult(json.d);
        setError();
        setLoading(false);
        return json.d;
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    },
    [token]
  );

  return {
    edit,
    draftEntity: result,
    draftLoading: loading,
    draftError: error,
  };
};

export const useUpdate = () => {
  const { token } = useContext(OdataContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const update = useCallback(
    async (entity, updatedFields) => {
      try {
        setLoading(true);
        await fetch(
          `${SERVICE_PATH}/TestEntity(Id=guid'${entity.Id}',IsActiveEntity=${entity.IsActiveEntity})`,
          {
            method: "MERGE",
            headers: createHeaders(token, entity),
            body: JSON.stringify(updatedFields),
          }
        );
        setError();
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    },
    [token]
  );

  return {
    update,
    updateLoading: loading,
    updateError: error,
  };
};
