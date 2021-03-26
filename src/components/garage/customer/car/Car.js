import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Maintenance } from './maintenance/Maintenance';
import { maintenanceOpenModal } from '../../../../redux/actions/maintenanceModal';
import { MaintenanceModal } from './maintenance/maintenanceModal/MaintenanceModal';
import{ startAddNewMaintenance } from '../../../../redux/actions/maintenance';


export const Car = ({ car }) => {
    const dispatch = useDispatch();

    const [isMaintenanceAdding, setIsMaintenanceAdding] = useState(false);

    const initialMaintenanceValues = {
        description: '',
        mechanic: '',
        costPrice: 0,
        cid: car._id
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
        event.preventDefault();

        setIsMaintenanceAdding(false);
        dispatch( startAddNewMaintenance( maintenanceFormValue ) );
    }

    const handleAddMaintenance = () => {
        setIsMaintenanceAdding(!isMaintenanceAdding);

        setMaintenanceFormValue(initialMaintenanceValues);
    }

    return (
        <div className="car-card">
            <div className="d-flex flex-row justify-content-between align-items-center">
                <h5>{ car.make } { car.model } { car.year }, { car.plate }</h5>
                {
                    isMaintenanceAdding ? (<></>) : (
                        <div>
                            <button onClick={ handleAddMaintenance } type="button" className="btn btn-success btn-sm mr-2 mb-2 mt-2"
                            data-toggle="collapse" data-target={`#maintenance-${car._id}`}>
                                <i className="bi bi-clipboard-plus"></i>
                            </button>
                            <button type="button" className="btn btn-warning btn-sm mr-2 mb-2 mt-2">
                                <i className="bi bi-pencil-fill"></i>
                            </button>
                            <button type="button" class="btn btn-info btn-sm mr-2 mb-2 mt-2"
                            data-toggle="collapse" data-target={`#car-${car._id}`}>
                                <i className="bi bi-list-check"></i>
                            </button>
                            <button type="button" className="btn btn-danger btn-sm mb-2 mt-2">
                                <i className="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    )
                }
            </div>

            {
                isMaintenanceAdding ? (
                    <div className="collapse w-100" id={`maintenance-${car._id}`} style={{ backgroundColor: "#fafafa" }}>
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
                            <button type="submit" class="btn btn-outline-success btn-sm mr-2">Save</button>
                            <button onClick={ handleAddMaintenance } type="button" class="btn btn-outline-danger btn-sm">Cancel</button>

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
