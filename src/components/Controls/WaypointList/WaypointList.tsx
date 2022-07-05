import React, { useState } from 'react';
import { ICoordinate } from '../../../App';
import WaypointListItem from './WaypointListItem/WaypointListItem';

function WaypointList({ waypoints, setWaypoints }: { waypoints: ICoordinate[], setWaypoints: (waypoints: ICoordinate[]) => void }) {
    const [draggingItem, setDraggingItem] = useState(-1);
    const [dragOverItem, setDragOverItem] = useState(-1);

    const listItems = waypoints.map((waypoint, index) => {
        return <WaypointListItem
            dragOverItem={dragOverItem}
            setDraggingItem={setDraggingItem}
            setDragOverItem={setDragOverItem}
            draggingItem={draggingItem}
            key={index}
            waypoint={waypoint}
            index={index}
            waypoints={waypoints}
            setWaypoints={setWaypoints}
        />
    });

    return (
        <div style={{ overflowY: "auto", color: "#fff", marginBottom: 25, paddingRight: 8 }}>
            {waypoints.length === 0 ? <p>Click on the map to add your first waypoint!</p> : listItems}
        </div>
    )
}

export default WaypointList;
