import React, { useEffect, useRef, useState } from 'react';
import { map, circle, tileLayer, polyline, Layer, marker, divIcon } from 'leaflet';
import './Map.css';
import { ICoordinate } from '../../App';

interface IMap {
    waypoints: ICoordinate[];
    setWaypoints: (waypoints: ICoordinate[]) => void;
}

const Map = ({ waypoints, setWaypoints }: IMap) => {
    const mapContainer = useRef(null);
    const mapRef = useRef<any>(null);
    const [mapElements, setMapElements] = useState<Layer[]>([]);

    useEffect(() => {
        // sets the map to the coordinates
        const initialState = {
            lng: 11.44567,
            lat: 47.30319,
            zoom: 11,
        };

        const leafletMap = map(mapContainer.current!).setView(
            [initialState.lat, initialState.lng],
            initialState.zoom
        );

        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(leafletMap);

        mapRef.current = leafletMap;
    }, []);

    useEffect(() => {
        mapElements.forEach(element => {
            mapRef.current.removeLayer(element);
        });

        let elements: Layer[] = []
        waypoints.forEach((waypoint, index) => {
            elements.push(marker([waypoint.lat, waypoint.long], {
                icon: divIcon({
                    className: "waypoint-icon",
                    html: `<div>${index}</div>`,
                    iconSize: [30, 30]
                })
            }).addTo(mapRef.current));
        })

        waypoints.forEach((waypoint, index) => {
            // Draw line from current point to next one (except for last waypoint)
            if (index === waypoints.length - 1) {
                return;
            }
            elements.push(polyline([[waypoint.lat, waypoint.long], [waypoints[index + 1].lat, waypoints[index + 1].long]], {
                color: '#000',
                fillColor: '#000',
                fillOpacity: 1,
            }).addTo(mapRef.current));
        })
        mapRef.current.on('click', (e: any) => setWaypoints([...waypoints, { lat: e.latlng.lat, long: e.latlng.lng }]))
        setMapElements(elements);
    }, [waypoints])

    return <div className="map-container" ref={mapContainer} />;
};

export default Map;
