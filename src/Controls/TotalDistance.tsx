import React, { useEffect, useState } from 'react';
import { ICoordinate } from '../App';

function crowDistance(coordinates1: ICoordinate, coordinates2: ICoordinate) {
    let { lat: lat1, long: lon1 } = coordinates1
    let { lat: lat2, long: lon2 } = coordinates2
    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344

        return dist;
    }
}

function TotalDistance({ waypoints }: { waypoints: ICoordinate[] }) {

    const [totalDistance, setTotalDistance] = useState(0);

    useEffect(() => {
        setTotalDistance(waypoints.reduce((acc, curr, index) => {
            if (index === waypoints.length - 1) {
                return acc;
            }
            return acc + crowDistance(waypoints[index], waypoints[index + 1]);
        }, 0))
    }, [waypoints]);


    return (
        <p style={{ color: "#fff" }}>
            Total distance: {totalDistance.toFixed(2)} km
        </p>
    )
}

export default TotalDistance;
