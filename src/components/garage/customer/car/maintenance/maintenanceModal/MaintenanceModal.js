import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { maintenanceCloseModal } from '../../../../../../redux/actions/maintenanceModal';
import './MaintenanceModal.css';


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
export const MaintenanceModal = () => {
    const initialState= {
        descripton: '',
        mechanic: '',
        costPrice: 0,
        cid: ''
    }

    const { maintenanceModalIsOpen } = useSelector(state => state.maintenanceModal);

    const dispatch = useDispatch();

    const closeNewMaintenanceModal = () => {
        dispatch( maintenanceCloseModal() );
    }

    const handleMaintenanceSave = (event) => {
        event.preventDefault();
    }

    return (
        <div>
            <Modal
                isOpen={ maintenanceModalIsOpen }
                onRequestClose={ closeNewMaintenanceModal }
                style={ customStyles }
                closeTimeoutMS={ 100 }
                className="modal"
                overlayClassName="modal-background"
            >
                <form
                onSubmit={ handleMaintenanceSave }>

                </form>

            </Modal>
        </div>
    )
}
