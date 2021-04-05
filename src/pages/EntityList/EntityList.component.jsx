import React, { useContext, useEffect } from "react";
import {
  ShellBar,
  AnalyticalTable,
  FlexBox,
  Button,
  Page,
  Toolbar,
  ToolbarSpacer,
  Loader,
} from "@ui5/webcomponents-react";
import {
  useActivate,
  useCreate,
  useDelete,
  useEdit,
  useRefresh,
  useUpdate,
} from "../../hooks/odata";
import CreateDialog from "../../components/CreateDialog/CreateDialog.component";
import { OdataContext } from "../../App";
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog.component";
import EditDialog from "../../components/EditDialog/EditDialog.component";

export default function EntityList() {
  const { create, createLoading } = useCreate();
  const { activate, activateLoading } = useActivate();
  const { deleteEntity, deleteLoading } = useDelete();
  const { refresh, entities, entitiesLoading } = useRefresh();
  const { edit, draftLoading } = useEdit();
  const { update, updateLoading } = useUpdate();

  const { token } = useContext(OdataContext);

  useEffect(() => {
    if (token) refresh();
  }, [token, refresh]);

  const handleCreate = async entity => {
    await activate(await create(entity));
    await refresh();
  };

  const handleActivate = async ({ row: { original: entity } }) => {
    await activate(entity);
    await refresh();
  };

  const handleEdit = async entity => {
    const draft = await edit(entity);
    await update(draft, { Field1: entity.Field1, Field2: entity.Field2 });
    await activate(draft);
    await refresh();
  };

  const handleDelete = async entity => {
    await deleteEntity(entity);
    await refresh();
  };

  return (
    <Page
      header={
        <ShellBar
          primaryTitle="Test Entity"
          logo={
            <img
              alt="SAP Logo"
              src="https://sap.github.io/ui5-webcomponents/assets/images/sap-logo-svg.svg"
            />
          }
        />
      }
      style={{ height: "100vh" }}
    >
      {(activateLoading ||
        draftLoading ||
        deleteLoading ||
        updateLoading ||
        entitiesLoading) && <Loader />}
      <AnalyticalTable
        columns={[
          {
            Header: "Field1",
            accessor: "Field1",
            defaultCanFilter: true,
          },
          {
            Header: "Field 2",
            accessor: "Field2",
            defaultCanFilter: true,
          },
          {
            Header: "Created By",
            accessor: "CreaUname",
            defaultCanFilter: true,
          },
          {
            Header: "Last Changed By",
            accessor: "LchgUname",
            defaultCanFilter: true,
          },
          {
            Header: "Draft",
            accessor: "IsActiveEntity",
            Cell: ({ row }) => {
              const isActive = row?.original
                ? row.original.IsActiveEntity
                : row.subRows.reduce((acc, val) => (acc = val.IsActiveEntity));
              return isActive ? "No" : "Yes";
            },
          },
          {
            Cell: instance => {
              return (
                <FlexBox>
                  <Button
                    icon="activate"
                    disabled={
                      instance?.row?.original?.IsActiveEntity ||
                      activateLoading ||
                      entitiesLoading
                    }
                    onClick={() => handleActivate(instance)}
                  />
                  <EditDialog
                    entity={instance?.row?.original}
                    loading={
                      draftLoading ||
                      updateLoading ||
                      activateLoading ||
                      entitiesLoading
                    }
                    onSave={handleEdit}
                  />
                  <DeleteDialog
                    entity={instance?.row?.original}
                    loading={deleteLoading || entitiesLoading}
                    onSave={handleDelete}
                  />
                </FlexBox>
              );
            },
            Header: "Actions",
            accessor: ".",
            canResize: false,
            id: "actions",
          },
        ]}
        data={entities}
        filterable
        groupBy={[]}
        groupable
        infiniteScroll
        withRowHighlight
        loading={entitiesLoading}
        title={
          <Toolbar
            className=""
            onClick={function noRefCheck() {}}
            slot=""
            style={{}}
            tooltip=""
          >
            <ToolbarSpacer />
            <CreateDialog
              onSave={handleCreate}
              loading={createLoading || activateLoading || entitiesLoading}
            />
          </Toolbar>
        }
      />
    </Page>
  );
}
