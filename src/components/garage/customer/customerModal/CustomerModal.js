import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { customerCloseModal } from '../../../../redux/actions/customerModal';
import './CustomerModal.css';


const customStyles = {
    content: {
        top : '50%',
        left : '50%',
        right : 'auto',
        bottom : 'auto',
        marginRight : '-50%',
        transform : 'translate(-50%, -50%)'
    }
}

Modal.setAppElement('#root');
export const CustomerModal = () => {
    const initialState= {
        name: ''
    }

    const { customerModalIsOpen } = useSelector(state => state.customerModal);

    const dispatch = useDispatch();

    const closeNewCustomerModal = () => {
        dispatch( customerCloseModal() );
    }

    return (
        <div>
            <Modal
                isOpen={ customerModalIsOpen }
                onRequestClose={ closeNewCustomerModal }
                style={ customStyles }
                closeTimeoutMS={ 100 }
                className="modal"
                overlayClassName="modal-background"
            >
                <p>Customer modal</p>

            </Modal>
        </div>
    )
}
