import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  Button,
  Bar,
  Form,
  FormItem,
  Input,
  Loader,
} from "@ui5/webcomponents-react";
import { createPortal } from "react-dom/cjs/react-dom.development";

export default function EditDialog({ onSave, loading, entity }) {
  const dialogRef = useRef(null);
  const [field1, setField1] = useState();
  const [field2, setField2] = useState();

  useEffect(() => {
    setField1(entity.Field1);
    setField2(entity.Field2);
  }, [entity]);

  const handleOpen = () => {
    dialogRef.current.open();
  };
  const handleClose = () => dialogRef?.current?.close();
  const handleSave = async () => {
    if (onSave) await onSave({ ...entity, Field1: field1, Field2: field2 });
    handleClose();
  };

  return (
    <React.Fragment>
      <Button disabled={!entity || loading} icon="edit" onClick={handleOpen} />
      {createPortal(
        <Dialog
          ref={dialogRef}
          className=""
          footer={
            <Bar
              endContent={
                <React.Fragment>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button design="Positive" onClick={handleSave}>
                    Save
                  </Button>
                </React.Fragment>
              }
            />
          }
          headerText="Update Entity"
        >
          {loading && <Loader />}
          <Form>
            <FormItem label="Field 1">
              <Input
                value={field1}
                onChange={event => setField1(event.target.value)}
              />
            </FormItem>
            <FormItem label="Field 2">
              <Input
                value={field2}
                onChange={event => setField2(event.target.value)}
              />
            </FormItem>
          </Form>
        </Dialog>,
        document.body
      )}
    </React.Fragment>
  );
}
