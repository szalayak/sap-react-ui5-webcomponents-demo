import React, { useRef, useState } from "react";
import {
  Dialog,
  Button,
  Bar,
  Form,
  FormItem,
  Input,
} from "@ui5/webcomponents-react";
import { createPortal } from "react-dom/cjs/react-dom.development";

export default function CreateDialog({ onSave }) {
  const dialogRef = useRef(null);
  const [field1, setField1] = useState();
  const [field2, setField2] = useState();

  const handleOpen = () => {
    dialogRef.current.open();
  };
  const handleClose = () => dialogRef.current.close();
  const handleSave = async () => {
    if (onSave)
      await onSave({
        Field1: field1 === "" ? null : field1,
        Field2: field2 === "" ? null : field2,
      });
    setField1("");
    setField2("");
    handleClose();
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Create</Button>
      {createPortal(
        <Dialog
          ref={dialogRef}
          className=""
          footer={
            <Bar
              endContent={
                <React.Fragment>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleSave}>Save</Button>
                </React.Fragment>
              }
            />
          }
          headerText="Create Entity"
        >
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
