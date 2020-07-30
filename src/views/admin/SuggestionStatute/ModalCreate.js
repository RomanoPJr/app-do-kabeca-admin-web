import { convertFromRaw, EditorState } from "draft-js";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Col, Form, Row } from "reactstrap";

import Modal from "../../../components/Modal";

const ModalCreate = ({ data, opened, setOpened, handleSubmitForm }) => {
  const [id] = useState(data ? data.id : "");
  const [description] = useState(data ? data.description : "");
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      convertFromRaw(
        JSON.parse(description || `{"blocks": [], "entityMap": {}}`)
      )
    )
  );

  return (
    <>
      {opened && (
        <Modal
          className="modal fade bd-example-modal-lg"
          title="Sugestão de Estatuto"
          opened={opened}
          setOpened={setOpened}
          size="lg"
        >
          <Form
            onSubmit={evt =>
              handleSubmitForm(
                evt,
                {
                  id,
                  description
                },
                editorState
              )
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
                Fechar
              </Button>
              <Button type="submit" color="primary">
                Salvar
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ModalCreate;
