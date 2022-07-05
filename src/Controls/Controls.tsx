import React from 'react';
import './Controls.css';

function Controls() {
    return (
        <div className="controls-container">
            <h2>Route builder</h2>
            <div className="divider" />
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
