import React from "react";
import {
  ShellBar,
  AnalyticalTable,
  FlexBox,
  Button,
  Page,
  Toolbar,
  ToolbarSpacer,
} from "@ui5/webcomponents-react";
import { useLoadData } from "../../hooks/odata";
import CreateDialog from "../../components/CreateDialog/CreateDialog.component";
export default function EntityList() {
  const [entities, entitiesLoading] = useLoadData();

  const handleCreate = async entity => {
    console.log({ entity });
  };

  const handleEdit = ({ row: { original: entity } }) => {
    alert("edit " + entity.Id);
  };

  const handleDelete = instance => {
    alert("delete " + instance.id);
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
      <AnalyticalTable
        columns={[
          {
            Header: "Id",
            accessor: "Id",
            defaultCanFilter: true,
          },
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
                  <Button icon="edit" onClick={() => handleEdit(instance)} />
                  <Button
                    icon="delete"
                    onClick={() => handleDelete(instance)}
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
            <CreateDialog onSave={handleCreate} />
          </Toolbar>
        }
      />
    </Page>
  );
}
