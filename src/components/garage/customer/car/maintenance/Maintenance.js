import React from 'react';
import { useDispatch } from 'react-redux';
import './Maintenance.css';
import { startingDeleteMaintenance } from '../../../../../redux/actions/maintenance';

export const Maintenance = ({ maintenances }) => {

    const dispatch = useDispatch();

    const handleDeleteMaintenance = ( maintenanceId ) => {
        dispatch( startingDeleteMaintenance( maintenanceId ) );
    }

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
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            maintenances.map((maintenance) => (
                                <tr>
                                    <td>{ maintenance.description }</td>
                                    <td>{ maintenance.mechanic }</td>
                                    <td>${ maintenance.costPrice }</td>
                                    <td>
                                        <button onClick={ () => handleDeleteMaintenance( maintenance._id ) } type="button" class="btn btn-outline-danger">
                                            <i class="bi bi-trash-fill"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}
