import React from 'react';
import { ICoordinate } from '../../../../App';
import DeleteIcon from './DeleteIcon';
import DragHandleIcon from './DragHandleIcon';

interface IWaypointListItem {
    draggingItem: any;
    dragOverItem: any;
    waypoint: ICoordinate;
    index: number;
    waypoints: ICoordinate[];
    setWaypoints: (waypoints: ICoordinate[]) => void;
    setDragOverItem: (dragOverItem: any) => void;
    setDraggingItem: (draggingItem: any) => void;
}

function WaypointListItem({ draggingItem, dragOverItem, setDragOverItem, setDraggingItem, waypoint, index, waypoints, setWaypoints }: IWaypointListItem) {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>
        , position: number) => {
        setDraggingItem(position);
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>
        , position: number) => {
        setDragOverItem(position);
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        if (draggingItem === dragOverItem) {
            return;
        }
        const newWaypoints = [...waypoints];
        newWaypoints.splice(draggingItem, 1);
        newWaypoints.splice(dragOverItem, 0, waypoint);
        setWaypoints(newWaypoints);
        setDraggingItem(-1);
        setDragOverItem(-1);
    };

    const dragEnterStyle = () => {
        if (index === dragOverItem && dragOverItem !== draggingItem) {
            if (draggingItem > dragOverItem) {
                return { borderTop: "5px solid #cad6b0" }
            } else {
                return { borderBottom: "5px solid #cad6b0" }
            }
        }
        return {}
    }

    return (
        <div
            key={index}
            style={{ ...{ display: "flex", alignItems: "center", margin: "20 0" }, ...dragEnterStyle() }}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
        >
            <div
                style={{ height: "100%", backgroundColor: "transparent", borderWidth: 0, marginRight: 10, cursor: "grab" }}
            >
                <DragHandleIcon height={30} color="#cad6b0" />
            </div>
            <h4 style={{ padding: 0, margin: 0, marginBottom: 3, cursor: "grab" }}>Waypoint {index + 1}</h4>
            <button
                style={{ marginLeft: "auto", height: "100%", backgroundColor: "transparent", borderWidth: 0 }}
                onClick={() => {
                    const newWaypoints = [...waypoints];
                    newWaypoints.splice(index, 1);
                    setWaypoints(newWaypoints);
                }}>
                <DeleteIcon height={30} color="#cad6b0" />
            </button>
        </div>
    )
}

export default WaypointListItem;
