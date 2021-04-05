import React, { useRef } from "react";
import { Dialog, Button, Bar, Loader } from "@ui5/webcomponents-react";
import { createPortal } from "react-dom/cjs/react-dom.development";

export default function DeleteDialog({ onSave, loading, entity }) {
  const dialogRef = useRef(null);

  const handleOpen = () => {
    dialogRef.current.open();
  };
  const handleClose = () => dialogRef?.current?.close();
  const handleSave = async () => {
    if (onSave) await onSave(entity);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button
        design="Negative"
        disabled={!entity || loading}
        icon="delete"
        onClick={handleOpen}
      />
      {createPortal(
        <Dialog
          ref={dialogRef}
          className=""
          footer={
            <Bar
              endContent={
                <React.Fragment>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button design="Negative" onClick={handleSave}>
                    Delete
                  </Button>
                </React.Fragment>
              }
            />
          }
          headerText="Delete Entity"
        >
          {loading && <Loader />}
          Are you sure you want to delete this line? This action can't be
          undone.
        </Dialog>,
        document.body
      )}
    </React.Fragment>
  );
}
