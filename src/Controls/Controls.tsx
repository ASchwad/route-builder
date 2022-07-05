import React from 'react';
import { ICoordinate } from '../App';
import './Controls.css';
import WaypointList from './WaypointList';

function Controls({ waypoints, setWaypoints }: { waypoints: ICoordinate[], setWaypoints: (waypoints: ICoordinate[]) => void }) {
    return (
        <div className="controls-container">
            <h2>Route builder</h2>
            <div className="divider" />
            <WaypointList waypoints={waypoints} setWaypoints={setWaypoints} />
            <div className="footer">
                <button className="download-button">
                    <h3>
                        Download your route
                    </h3>
                </button>
            </div>
        </div>
    );
}

export default Controls;
