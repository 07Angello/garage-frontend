import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Maintenance } from './maintenance/Maintenance';
import { maintenanceOpenModal } from '../../../../redux/actions/maintenanceModal';
import { MaintenanceModal } from './maintenance/maintenanceModal/MaintenanceModal';
import{ startAddNewMaintenance } from '../../../../redux/actions/maintenance';
import Swal from 'sweetalert2';
import { startingDeleteCar } from '../../../../redux/actions/car';

export const Car = ({ car }) => {
    const dispatch = useDispatch();

    const [isMaintenanceAdding, setIsMaintenanceAdding] = useState(false);

    var currentDate = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
    const initialMaintenanceValues = {
        description: '',
        mechanic: '',
        costPrice: 0,
        cid: car._id,
        creationDate: currentDate.toLocaleDateString('en-us', options),
    }

    const [maintenanceFormValue, setMaintenanceFormValue] = useState(initialMaintenanceValues);

    const { description, mechanic, costPrice } = maintenanceFormValue;

    const handleOpenMaintenanceModal = () => {
        dispatch( maintenanceOpenModal() );
    }

    const handleInputChange = ({ target }) => {
        setMaintenanceFormValue({
            ...maintenanceFormValue,
            [target.name]: target.value
        });
    }

    const handleSaveCarMaintenance = (event) => {

        setIsMaintenanceAdding(false);
        dispatch( startAddNewMaintenance( maintenanceFormValue ) );
    }

    const handleAddMaintenance = () => {
        console.log(initialMaintenanceValues);
        setIsMaintenanceAdding(true);
        setMaintenanceFormValue(initialMaintenanceValues);
    }

    const handleCancel = () => {
        setIsMaintenanceAdding(false);
        setMaintenanceFormValue(initialMaintenanceValues);
    }

    const handleDeleteCar = () => {
        Swal.fire({
            title: 'Delete Car?',
            text: 'Are you sure you want to delete this car?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                dispatch( startingDeleteCar( car._id ) );
            }
        });
    }

    return (
        <div className="car-card">
            <div className="d-flex flex-row justify-content-between align-items-center">
                <h5>{ car.make } { car.model } { car.year }, { car.plate }</h5>

                <div>
                    <button onClick={ handleAddMaintenance } type="button" className="btn btn-success btn-sm mr-2 mb-2 mt-2"
                    data-toggle="collapse" data-target={`#maintenance-${car._id}`}>
                        <i className="bi bi-clipboard-plus"></i>
                    </button>
                    { /* 
                    <button type="button" className="btn btn-warning btn-sm mr-2 mb-2 mt-2"  disabled={isMaintenanceAdding}>
                        <i className="bi bi-pencil-fill"></i>
                    </button>
                    */ }
                    <button type="button" className="btn btn-info btn-sm mr-2 mb-2 mt-2"
                    data-toggle="collapse" data-target={`#car-${car._id}`}  disabled={isMaintenanceAdding}  data-tip={`${ car.maintenances.length } Maintenances `}>
                        { car.maintenances.length } <i className="bi bi-tools"></i>
                    </button>
                    <button onClick={ handleDeleteCar } type="button" className="btn btn-danger btn-sm mb-2 mt-2"  disabled={isMaintenanceAdding}>
                        <i className="bi bi-trash-fill"></i>
                    </button>
                </div>

            </div>

            {
                isMaintenanceAdding ? (
                    <div className="w-100" style={{ backgroundColor: "#fafafa" }}>
                        <h5>New Maintenance for { car.make } { car.model }</h5>
                        <form
                        onSubmit={ handleSaveCarMaintenance }>
                            
                            <div className="form-group">
                                <label>Maintenance Description</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    placeholder="Maintenance description"
                                    name="description"
                                    value={ description }
                                    onChange={ handleInputChange }
                                    id="description"

                                ></input>
                            </div>
                            <div className="form-group">
                                <label>Mechanic</label>
                                <input
                                    type="text"
                                    className={`form-control`}
                                    placeholder="Mechanic"
                                    name="mechanic"
                                    value={ mechanic }
                                    onChange={ handleInputChange }
                                    id="mechanic"

                                ></input>
                            </div>
                            <div className="form-group">
                                <label>Cost Price</label>
                                <input
                                    type="number"
                                    className={`form-control`}
                                    placeholder="Cost Price"
                                    name="costPrice"
                                    value={ costPrice }
                                    onChange={ handleInputChange }
                                    id="costPrice"

                                ></input>
                            </div>
                            <button type="submit" className="btn btn-outline-success btn-sm mr-2"
                            data-toggle="collapse" data-target={`#car-${car._id}`}>Save</button>
                            <button onClick={ handleCancel } type="button" className="btn btn-outline-danger btn-sm"
                            data-toggle="collapse" data-target={`#car-${car._id}`}>Cancel</button>

                        </form>
                        <br />
                    </div>
                    
                ) : (
                    <div className="collapse w-100" id={`car-${car._id}`} style={{ backgroundColor: "#fafafa" }}>
                        <Maintenance maintenances={ car.maintenances } ></Maintenance>
                    </div>
                )
            }
                
            <MaintenanceModal />
        </div>
    )
}
