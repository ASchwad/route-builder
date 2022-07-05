import React from 'react';
import { ICoordinate } from '../App';
import './Controls.css';
import TotalDistance from './TotalDistance';
import WaypointList from './WaypointList/WaypointList';


function Controls({ waypoints, setWaypoints }: { waypoints: ICoordinate[], setWaypoints: (waypoints: ICoordinate[]) => void }) {

    return (
        <div className="controls-container">
            <h2>Route builder</h2>
            <div className="divider" />
            <WaypointList waypoints={waypoints} setWaypoints={setWaypoints} />
            <div className="footer">
                <button onClick={() => setWaypoints([])} style={{ backgroundColor: 'transparent', color: "#fff", borderWidth: 0, marginBottom: 10 }}>Clear route</button>
                <div className="divider" />
                <div style={{ color: "#fff", textAlign: 'left' }}>
                    <TotalDistance waypoints={waypoints} />
                </div>
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
