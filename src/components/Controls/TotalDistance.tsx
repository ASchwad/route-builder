import React, { useEffect, useState } from 'react';
import { ICoordinate } from '../../App';
import { calculateDistance } from '../../utils/calculateDistance';

function TotalDistance({ waypoints }: { waypoints: ICoordinate[] }) {
    const [totalDistance, setTotalDistance] = useState(0);

    useEffect(() => {
        setTotalDistance(waypoints.reduce((acc, curr, index) => {
            if (index === waypoints.length - 1) {
                return acc;
            }
            return acc + calculateDistance(waypoints[index], waypoints[index + 1]);
        }, 0))
    }, [waypoints]);

    return (
        <p style={{ color: "#fff" }}>
            Total distance: {totalDistance.toFixed(2)} km
        </p>
    )
}

export default TotalDistance;
