import React, { useState } from "react";
import { useEffect } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { FaPaperPlane, FaSave } from "react-icons/fa";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Modal from "../../../components/Modal";
import LoadingSpinner from "../../../components/LoadingSpinner";
import MatchInvite from '../../../store/match_invite/match_invite.actions'

const ModalInvite = ({ fetchMatchList, pageNumber, data, error, opened, setOpened, createMatchInvite, loading, match }) => {
  const [shown, setShown] = useState(false);
  
  const handleConfirmation = () => {
    setShown(true)
    console.log("TESTE")
    createMatchInvite({ 
      match_date:data.date
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
      
      <h4 style={{textAlign: 'center', color: 'black' }}>DESEJA ENVIAR O CONVITE PARA OS JOGADORES?</h4>
      <div className="custom-modal-footer">
          <Button
            className="btn btn-close-modal"
            onClick={() => setOpened(!opened)}
          >
            FECHAR
          </Button>
          <Button
            id="teste"
            className="btn-confirm"
            disabled={loading}
            onClick={() => {
              handleConfirmation()
            }}
          >
            {loading ? <LoadingSpinner /> : <FaPaperPlane />}
            ENVIAR
          </Button>
        </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  loading: state.match_invite.loading,
  error: state.match_invite.error
})

const mapDispatchToProps = (dispatch) => ({
  createMatchInvite: (payload) => dispatch(MatchInvite.create(payload))
})


export default connect(mapStateToProps, mapDispatchToProps)(ModalInvite);
