import React, { useState } from "react";
import { useEffect } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { FaSave } from "react-icons/fa";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Modal from "../../../components/Modal";
import LoadingSpinner from "../../../components/LoadingSpinner";
import MatchInviteConfirmation from '../../../store/match_invite_confirmation/match_invite_confirmation.actions'

const ModalConfirm = ({ fetchMatchList, pageNumber, data, error, opened, setOpened, createMatchInviteConfirmation, loading, match }) => {
  const [shown, setShown] = useState(false);
  
  const handleConfirmation = async () => {
    setShown(true)
    await createMatchInviteConfirmation({
      match_date:data.date,
      match_invite_id: data.match_invite_id
    });
  }

  useEffect(() => {
    if(shown && !loading && error === null){
      setOpened(false)
    }else if(shown === true && loading === false && error === ''){
      setOpened(false)
      fetchMatchList({ pageNumber });
    }
  }, [error, shown, loading])

  return (
    <Modal
      title="CONFIRMAR PRESENÇA"
      opened={opened}
      setOpened={setOpened}
      className="modal fade"
    >
      
      <h4 style={{textAlign: 'center', color: 'black' }}>DESEJA CONFIRMAR SUA PRESENÇA PARA ESTE DIA?</h4>
      <div className="custom-modal-footer">
          <Button
            className="btn btn-close-modal"
            onClick={() => setOpened(!opened)}
          >
            FECHAR
          </Button>
          <Button
            className="btn-confirm"
            color="primary"
            disabled={loading}
            onClick={() => {
              handleConfirmation(true)
            }}
          >
            {loading ? <LoadingSpinner /> : <FaSave />}
            CONFIRMAR
          </Button>
        </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  loading: state.match_invite_confirmation.loading,
  error: state.match_invite_confirmation.error
})

const mapDispatchToProps = (dispatch) => ({
  createMatchInviteConfirmation: (payload) => dispatch(MatchInviteConfirmation.create(payload))
})


export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirm);
