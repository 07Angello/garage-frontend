import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { startGettingCustomersFiltered } from '../../../redux/actions/customer';
import { Customer } from '../customer/Customer';
import './HomeScreen.css';

export const HomeScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( startGettingCustomersFiltered('ALL') );
    }, [ dispatch ]);


    const { customers } = useSelector(state => state.customer);

    return (
        <div className="posts-container mb-3">
            <div className="container">
                <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-7">

                    
                        
                    <div className="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Customer filter..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
                        </div>
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
