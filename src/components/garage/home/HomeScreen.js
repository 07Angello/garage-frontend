import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { startGettingCustomersFiltered } from '../../../redux/actions/customer';
import { Customer } from '../customer/Customer';
import { startAddNewCustomer } from '../../../redux/actions/customer'
import './HomeScreen.css';

export const HomeScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( startGettingCustomersFiltered('ALL') );
    }, [ dispatch ]);

    const initialValue = {
        filter: ''
    }
    const [stateFilter, setStateFilter] = useState(initialValue);
    const { filter } = stateFilter;

    const initialCustomerForm = {
        name: ''
    }
    const [stateCustomerForm, setStateCustomerForm] = useState(initialCustomerForm);
    const { name } = stateCustomerForm;

    const { customers } = useSelector(state => state.customer);

    const handleSaveCustomer = (event) => {
        event.preventDefault();

        dispatch( startAddNewCustomer( stateCustomerForm ) );
        setStateCustomerForm(initialCustomerForm);
    }

    const handleInputChange = ({ target }) => {
        setStateCustomerForm({
            ...stateCustomerForm,
            [target.name]: target.value
        });
    }

    const handleFilterChange = ({ target }) => {
        setStateFilter({
            ...stateCustomerForm,
            [target.name]: target.value
        });
    }

    const handleCancelCustomerCreation = () => {
        setStateCustomerForm(initialCustomerForm);
    }

    const handleSearchCustomer = (event) => {
        event.preventDefault();
        
        const filtering = filter.length === 0 ? 'ALL' : filter;
        dispatch( startGettingCustomersFiltered(filtering) );
    }

    return (
        <div className="posts-container mb-3">
            <div className="container">
                <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-7">

                        <div className="d-flex flex-row justify-content-end align-items-center mb-3">
                            <form className="w-100"
                            onSubmit={ handleSearchCustomer }>
                            <div className="input-group col-md-9">
                                <input type="text" className="form-control" name="filter" onChange={ handleFilterChange } value={ filter } 
                                placeholder="Customer filter..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Search</button>
                                </div>
                            </div>
                            </form>
                            
                            <div className="col-md-3">
                                <button type="button" className="btn btn-outline-primary"
                                data-toggle="collapse" data-target="#create-user">Create User</button>
                            </div>
                        </div>
                        <div className="collapse w-100 mb-5 px-5" id="create-user" style={{ backgroundColor: "#fafafa" }}>
                            <form
                            onSubmit={ handleSaveCustomer } className="py-3">
                                <div className="form-group">
                                    <label>Customer Name</label>
                                    <input
                                        type="text"
                                        className={`form-control`}
                                        placeholder="Customer Name"
                                        name="name"
                                        value={ name }
                                        onChange={ handleInputChange }
                                        id="nameCustomer"

                                    ></input>
                                </div>
                                <button type="submit" className="btn btn-outline-success mr-2"
                                data-toggle="collapse" data-target="#create-user">Save</button>

                                <button onClick={ handleCancelCustomerCreation } type="button" className="btn btn-outline-danger"
                                data-toggle="collapse" data-target="#create-user">Cancel</button>
                            </form>
                        </div>
                        
                        {
                            customers.length === 0 ? (<h5 className="text-center mt-5">No customers YET...</h5>) : (
                                <div>
                                    <TransitionGroup>
                                    {
                                        customers.map((customer) => (
                                            <CSSTransition key={ customer._id } timeout={ 300 } classNames="post">
                                                <Customer customer={ customer } />
                                            </CSSTransition>
                                        ))
                                    }
                                    </TransitionGroup>
                                </div>
                            )
                        }
                        </div>
                    <br />
                </div>
            </div>
        </div>
    )
}
