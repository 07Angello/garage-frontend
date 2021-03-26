import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Maintenance.css'

export const Maintenance = ({ maintenances }) => {
    return (
        <div>
            {
                maintenances.length === 0 ? (<h5 className="text-center mt-5">No maintenance YET...</h5>) : (
                    <table className="table  table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Description</th>
                                <th scope="col">Mechanic</th>
                                <th scope="col">Cost Price</th>
                            </tr>
                        </thead>
                        <tbody>
                    <TransitionGroup>
                    {
                        maintenances.map((maintenance) => (
                            <CSSTransition key={ maintenance._id } timeout={ 300 } classNames="post">
                                <tr>
                                    <td>{ maintenance.description }</td>
                                    <td>{ maintenance.mechanic }</td>
                                    <td>${ maintenance.costPrice }</td>
                                </tr>
                            </CSSTransition>
                        ))
                    }
                    </TransitionGroup>
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}
