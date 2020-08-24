import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Col, Form, Row } from "reactstrap";

import Modal from "../../../components/Modal";

const ModalCreate = ({ data, opened, setOpened, handleSubmitForm }) => {
  const [id, setId] = useState();
  const [editorState, setEditorState] = useState();

  useEffect(() => {
    if (data) {
      if (!data.suggestion) {
        setId(data.id);
      }
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(
            JSON.parse(data.description || `{"blocks": [], "entityMap": {}}`)
          )
        )
      );
    }
  }, [data]);

  return (
    <>
      {opened && (
        <Modal
          className="modal fade bd-example-modal-lg"
          title="Estatuto"
          opened={opened}
          setOpened={setOpened}
          size="lg"
        >
          <Form
            onSubmit={evt =>
              handleSubmitForm(evt, {
                id,
                description: JSON.stringify(
                  convertToRaw(editorState.getCurrentContent())
                )
              })
            }
          >
            <Row>
              <Col md="12">
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={editorState =>
                    setEditorState(editorState)
                  }
                />
              </Col>
            </Row>
            <div className="custom-modal-footer">
              <Button color="secondary" onClick={() => setOpened(!opened)}>
                FECHAR
              </Button>
              <Button type="submit" color="primary">
                SALVAR
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ModalCreate;
