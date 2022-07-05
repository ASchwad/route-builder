import React from 'react';
import { ICoordinate } from '../../../../App';
import DeleteIcon from './DeleteIcon';
import DragHandleIcon from './DragHandleIcon';

function WaypointListItem({ waypoint, index, waypoints, setWaypoints }: { waypoint: ICoordinate, index: number, waypoints: ICoordinate[], setWaypoints: (waypoints: ICoordinate[]) => void }) {

    return (
        <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
            <button
                style={{ height: "100%", backgroundColor: "transparent", borderWidth: 0, marginRight: 10 }}>
                <DragHandleIcon height={30} color="#fff" />
            </button>
            <h4 style={{ padding: 0, margin: 0, marginBottom: 3 }}>Waypoint {index + 1}</h4>
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
    )
}

export default WaypointListItem;
