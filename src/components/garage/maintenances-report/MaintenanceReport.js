import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGettingCustomersFiltered } from '../../../redux/actions/customer';
import { Navbar } from '../../ui/Navbar';
import './MaintenanceReport.css';

export const MaintenanceReport = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( startGettingCustomersFiltered('ALL') );
    }, [ dispatch ]);

    const { customers } = useSelector(state => state.customer);

    return (
        <div>
            <Navbar />
            <div className="posts-container mb-3 ">
                <div className="containe d-flex flex-row justify-content-center align-items-center">
                    <div className="col-md-11 card">
                        <div className="card-body">
                            <h3>Maintenance Report</h3>
                            <table class="table table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Customer</th>
                                        <th scope="col">Vehicle</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Mechanic</th>
                                        <th scope="col">Cost Price</th>
                                        <th scope="col">Repair Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    customers.map((customer) => (
                                        <>
                                        <tr className="table-active">
                                            <td colspan="6" className="font-weight-bolder">
                                                <i class="bi bi-person-fill"></i> { customer.name } - Vehicles: { customer.cars.length }
                                            </td>
                                        </tr>
                                        {
                                            customer.cars.map((car) => (
                                                <>
                                                <tr>
                                                    <td></td>
                                                    <td colspan="5">
                                                        <i class="bi bi-speedometer"></i> {car.make} {car.model} {car.year}, {car.plate}
                                                            <b className="ml-5">====> Total Cost: ${car.maintenances.reduce((car,mntnance) =>  car = car + mntnance.costPrice , 0 ) }</b>
                                                    </td>
                                                </tr>
                                                {
                                                    car.maintenances.map((maintenance) => (
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td><i class="bi bi-tools"></i> { maintenance.description }</td>
                                                            <td>{ maintenance.mechanic }</td>
                                                            <td>${ maintenance.costPrice }</td>
                                                            <td>{ maintenance.creationDate }</td>
                                                        </tr>
                                                    ))
                                                }
                                                </>
                                            ))
                                        }
                                        </>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}


