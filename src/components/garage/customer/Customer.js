import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { startAddNewCar } from '../../../redux/actions/car';
import Swal from 'sweetalert2';
import { Car } from './car/Car';
import './Customer.css';
import { startingDeleteCustomer } from '../../../redux/actions/customer'

export const Customer = ({ customer }) => {
    const dispatch = useDispatch();


    const initialCarForm = {
        cid: customer._id,
        make: '',
        model: '',
        plate: '',
        year: 2021
    }

    const [stateCarForm, setStateCarForm] = useState(initialCarForm);
    const [stateIsCarAdding, setStateIsCarAdding] = useState(false);

    const { make, model, plate, year } = stateCarForm;    

    const handleInputChange = ({ target }) => {
        setStateCarForm({
            ...stateCarForm,
            [target.name]: target.value
        });
    }

    const handleCreateNewCar = () => {
        setStateIsCarAdding( true );
    }

    const handleSaveNewCar = (event) => {
        event.preventDefault();

        dispatch( startAddNewCar( stateCarForm ) );
        setStateCarForm( initialCarForm );
        setStateIsCarAdding( false );
    }

    const handleCancelCarSaving = () => {
        setStateIsCarAdding( false );
    }

    const handleDeleteCustomer = () => {
        Swal.fire({
            title: 'Delete Customer?',
            text: 'Are you sure you want to delete this customer?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                dispatch( startingDeleteCustomer( customer._id ) );
            }
        });
    }

    return (
        <div className="card mt-3">
            <div className="card-body">
                
                <div className="d-flex flex-column justify-content-end align-items-center">
                    <div className="w-100 d-flex flex-column justify-content-end align-items-end">
                        <button className="btn btn-light btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="bi bi-gear-fill"></i>
                        </button>
                        <div className="dropdown-menu">
                            <b onClick={ handleCreateNewCar } className="dropdown-item"><i className="bi bi-file-plus-fill"></i> Add Car</b>
                            <b className="dropdown-item"><i className="bi bi-pencil mr-1"></i> Edit Customer</b>
                            <b onClick={ handleDeleteCustomer } className="dropdown-item"><i className="bi bi-trash mr-1"></i> Delete Customer</b>
                        </div>
                    </div>
                    <div className="w-100 d-flex flex-row justify-content-between align-items-center">
                        <h4>{ customer.name }</h4>
                        {
                            customer.cars.length <= 1 ? (
                                <h5 className="carsNumber"
                                    data-toggle="collapse" data-target={`#customer-${customer._id}`}
                                >
                                    { customer.cars.length } Car
                                </h5>
                            ) : (
                                <h5 className="carsNumber"
                                    data-toggle="collapse" data-target={`#customer-${customer._id}`}
                                >
                                    { customer.cars.length } Cars
                                </h5>
                            )
                        }
                    </div>

                    <hr />

                    {
                        stateIsCarAdding ? (
                            <div className="w-100">
                                <h4>Add a new car</h4>
                                <form
                                onSubmit={ handleSaveNewCar }>
                                    <div className="form-group">
                                        <label>Car brand</label>
                                        <input
                                            type="text"
                                            className={`form-control`}
                                            placeholder="Car brand"
                                            name="make"
                                            value={ make }
                                            onChange={ handleInputChange }
                                            id="make"

                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Car model</label>
                                        <input
                                            type="text"
                                            className={`form-control`}
                                            placeholder="Car model"
                                            name="model"
                                            value={ model }
                                            onChange={ handleInputChange }
                                            id="model"

                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Car plate</label>
                                        <input
                                            type="text"
                                            className={`form-control`}
                                            placeholder="Car plate"
                                            name="plate"
                                            value={ plate }
                                            onChange={ handleInputChange }
                                            id="plate"

                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Year</label>
                                        <input
                                            type="number"
                                            className={`form-control`}
                                            placeholder="Year"
                                            name="year"
                                            value={ year }
                                            onChange={ handleInputChange }
                                            id="year"

                                        ></input>
                                    </div>
                                    <button type="submit" className="btn btn-outline-success btn-sm mr-2">Save</button>
                                    <button onClick={ handleCancelCarSaving } type="button" className="btn btn-outline-danger btn-sm">Cancel</button>

                                </form>
                            </div>
                        ):(
                            <div className="collapse w-100" id={`customer-${customer._id}`} style={{ backgroundColor: "#fafafa" }}>
                            {
                                customer.cars.length === 0 ? (<h6 className="text-center mt-5">There are no registered cars for this customer...</h6>) : (
                                    <TransitionGroup>
                                    {
                                        customer.cars.map((car) => (
                                            <CSSTransition key={ car._id } timeout={ 300 } >
                                                <Car car={ car } />
                                            </CSSTransition>
                                        ))
                                    }
                                    </TransitionGroup>
                                )
                            }
                            </div>
                        )
                    }



                </div>
            </div>
        </div>
    )
}
