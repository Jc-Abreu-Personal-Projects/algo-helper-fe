import React, { useEffect } from 'react';
import '../css/CellModal.css';
import axios from 'axios';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const CellModal = ({ open, toggleModal, cardInfo, cards, changeCardInfo, userId }) => {
  //NO CARD CHOSEN EDGECASE
  if (cardInfo.index === -1) {
    return <></>
  }

  const card = cards[cardInfo.status][cardInfo.index];
  const handleClose = () => {
    toggleModal(-1, '');
  }

  const sendNewUpdate = (property, newValue) => {
    const config = {
      method: 'patch',
      url: 'http://localhost:4000/update/field',
      params: {
        userId: userId,
        cardId: card.id,
        field: property,
        newValue: newValue
      }
    };

    axios(config)
      .then(response => {
        console.log(response);
      }).catch(err => console.log(err));
  }

  return (
    <div>
      <Modal className="modal" open={open} onClose={handleClose}>
        <Box className="modal_card">
          <form className='modal_card_form'>
            <div className='modal_card_form_left'>
              <p className='modal_card_form_date'>{"Created At: " + card.createdAt}</p>
              <label className='modal_card_form_name'>Problem Name</label>
              <input className='modal_card_form_name-input' onBlur={(e) => {
                sendNewUpdate('problemName', e.target.value);
              }} type="text" defaultValue={card.problemName} onChange={(e) => {
                changeCardInfo(cardInfo, 'problemName', e.target.value);
              }} />
              <label className='modal_card_form_platform'>Platform</label>
              <input className='modal_card_form_platform-input'
                onBlur={(e) => {
                  sendNewUpdate('platform', e.target.value);
                }}
                type="text" defaultValue={card.platform} onChange={(e) => {
                  changeCardInfo(cardInfo, 'platform', e.target.value);
                }} />

              <label className='modal_card_form_description'>Description</label>
              <input className='modal_card_form_description-input'
                onBlur={(e) => {
                  sendNewUpdate('description', e.target.value);
                }}
                type="text" defaultValue={card.description} onChange={(e) => {
                  changeCardInfo(cardInfo, 'description', e.target.value);
                }} />
              <label className='modal_card_form_number'>Problem Number</label>
              <input className='modal_card_form_number-input'
                onBlur={(e) => {
                  sendNewUpdate('problemNumber', e.target.value);
                }}
                type="text" defaultValue={card.problemNumber} onChange={(e) => {
                  changeCardInfo(cardInfo, 'problemNumber', e.target.value);
                }} />
              {/* THIS IS GOING TO BE A DROPDOWN */}
              <label className='modal_card_form_datastructure'>Data Structure Type</label>
              <input className='modal_card_form_datastructure-input' type="text" defaultValue={card.dataStructure}
                onBlur={(e) => {
                  sendNewUpdate('dataStructure', e.target.value);
                }}
                onChange={(e) => {

                  changeCardInfo(cardInfo, 'dataStructure', e.target.value);

                }}
              />
              {/* ----------------------------- */}
              <label className='modal_card_form_input'>Inputs</label>
              <input className='modal_card_form_input-input'
                onBlur={(e) => {
                  sendNewUpdate('inputs', e.target.value);
                }}
                type="text" defaultValue={card.inputs}
                onChange={(e) => {
                  changeCardInfo(cardInfo, 'inputs', e.target.value);
                }} />
              <label className='modal_card_form_output'>Expected Output</label>
              <input className='modal_card_form_output-input'
                onBlur={(e) => {
                  sendNewUpdate('expectedOutput', e.target.value);
                }}
                type="text" defaultValue={card.expectedOutput}
                onChange={(e) => {
                  changeCardInfo(cardInfo, 'expectedOutput', e.target.value);
                }} />
              <label className='modal_card_form_constraints'>Constraints</label>
              <input className='modal_card_form_constraints-input'
                onBlur={(e) => {
                  sendNewUpdate('constraints', e.target.value);
                }}
                type="text" defaultValue={card.constraints}
                onChange={(e) => {
                  changeCardInfo(cardInfo, 'constraints', e.target.value);
                }} />
              <label className='modal_card_form_comments'>Comments</label>
              <input className='modal_card_form_comments-input'
                onBlur={(e) => {
                  sendNewUpdate('comments', e.target.value);
                }}
                type="text" defaultValue={card.comments}
                onChange={(e) => {
                  changeCardInfo(cardInfo, 'comments', e.target.value);
                }} />
              <Button className="modal_card_form_btn" size={'large'} color={"secondary"} onClick={() => {
                toggleModal(-1, '');
              }}>Save</Button>
            </div>
            <div className='modal_card_form_right'>
              <label className='modal_card_form_completed'>Completed?</label>
              <input className='modal_card_form_completed-radio' type="radio" defaultValue={'Completed'} defaultChecked={card.completed} onChange={(e) => {
                changeCardInfo(cardInfo, 'completed', e.target.checked);
                sendNewUpdate('completed', e.target.checked);
              }} />
              <label className='modal_card_form_lookup' >Looked at Solution?</label>
              <input className='modal_card_form_lookup-radio' type="radio" defaultValue={'Looked Up Solution'} defaultChecked={card.solutionLookup}
                onChange={(e) => {
                  changeCardInfo(cardInfo, 'solutionLookup', e.target.checked);
                }} />
              <fieldset className='modal_card_form_difficulty' id='difficulty' >
                <p className='modal_card_form_difficulty_title'>Difficulty</p>
                <label className='modal_card_form_difficulty_easy'>Easy</label>
                <input className='modal_card_form_difficulty_easy-radio' type="radio" defaultValue={'easy'} name={'difficulty'} defaultChecked={card.difficulty === 'easy'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      changeCardInfo(cardInfo, 'difficulty', 'easy');
                    }
                  }} />
                <label className='modal_card_form_difficulty_medium' >Medium</label>
                <input className='modal_card_form_difficulty_medium-radio' type="radio" defaultValue={'medium'} name={'difficulty'} defaultChecked={card.difficulty === 'medium'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      changeCardInfo(cardInfo, 'difficulty', 'medium');
                    }
                  }} />
                <label className='modal_card_form_difficulty_hard'>Hard</label>
                <input className='modal_card_form_difficulty_hard-radio' type="radio" defaultValue={'hard'} name={'difficulty'} defaultChecked={card.difficulty === 'hard'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      changeCardInfo(cardInfo, 'difficulty', 'hard');
                    }
                  }}
                />
              </fieldset>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}


export default CellModal;