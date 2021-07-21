import React from 'react'
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Typography } from '@material-ui/core';
import { closeModal} from '../../store/actions/modalActions'
import CancelIcon from '@material-ui/icons/Cancel';
import Icon from '../Icon'


const useStyle = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: props => props.padding || theme.spacing(4)
  },
  header: {
    display: 'flex', 
    justifyContent: 'space-between', 
    width: '100%',
    marginBottom: theme.spacing(2)
  }
}))

const ModalContainer = ({children, close, isOpen, ...props}) => {
    const classes = useStyle(props)

    const dispatch = useDispatch()
    const {isModalShowing, modalContent, modalHeader} = useSelector(state => state.modal)

    const handleCloseModal = (e) => {
      dispatch(closeModal())
    }

    return (
        <Modal
            open={isOpen || isModalShowing}
            onClose={isOpen || !isModalShowing}
            aria-labelledby="modal-title"
        >
            <Paper  className={classes.paper} elevation={3}>
              <div className={classes.header}>
                    <Typography id='modal-title' variant='h6' component='h3'>
                      {modalHeader}
                    </Typography>
                    <Icon component={CancelIcon} margin='0' onClick={close || handleCloseModal}/>
              </div>
                {children || modalContent}
            </Paper>
        </Modal>
    )
}

ModalContainer.propTypes = {
  children: PropTypes.element
}

export default ModalContainer
