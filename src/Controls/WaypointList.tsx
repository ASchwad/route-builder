import React from 'react';
import { ICoordinate } from '../App';
import './Controls.css';

function WaypointList({ waypoints, setWaypoints }: { waypoints: ICoordinate[], setWaypoints: (waypoints: ICoordinate[]) => void }) {

    const waypointList = waypoints.map((waypoint, index) => {
        return <div key={index}>
            <p>Waypoint {index}</p>
            <p>Lat: {waypoint.lat}</p>
            <p>Long: {waypoint.long}</p>
        </div>
    });

    return (
        <div>
            {waypointList}
        </div>
    )
}

export default WaypointList;
