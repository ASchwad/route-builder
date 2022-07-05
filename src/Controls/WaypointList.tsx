import React from 'react';
import { ICoordinate } from '../App';
import './Controls.css';
import DeleteIcon from './DeleteIcon';
import DragHandleIcon from './DragHandleIcon';

function WaypointList({ waypoints, setWaypoints }: { waypoints: ICoordinate[], setWaypoints: (waypoints: ICoordinate[]) => void }) {

    const waypointList = waypoints.map((waypoint, index) => {
        return <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
            <button
                style={{ height: "100%", backgroundColor: "transparent", borderWidth: 0, marginRight: 10 }}>
                <DragHandleIcon height={30} color="#fff" />
            </button>
            <div>
                <h3 style={{ padding: 0, margin: 0, marginBottom: 3 }}>Waypoint {index + 1}</h3>
                <p style={{ fontSize: 12, margin: 0 }}>Lat: {waypoint.lat}</p>
                <p style={{ fontSize: 12, margin: 0 }}>Long: {waypoint.long}</p>
            </div>
            <button
                style={{ marginLeft: "auto", height: "100%", backgroundColor: "transparent", borderWidth: 0 }}
                onClick={() => {
                    const newWaypoints = [...waypoints];
                    newWaypoints.splice(index, 1);
                    setWaypoints(newWaypoints);
                }}>
                <DeleteIcon height={30} color="#fff" />
            </button>
        </div>
    });

    return (
        <div style={{ overflowY: "auto", color: "#fff", marginBottom: 25, paddingRight: 8 }}>
            {waypoints.length === 0 ? <p>Click on the map to add your first waypoint!</p> : waypointList}
        </div>
    )
}

export default WaypointList;
