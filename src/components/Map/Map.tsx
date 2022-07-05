import React, { useEffect, useRef, useState } from 'react';
import { map, circle, tileLayer, polyline, Layer, marker, divIcon, Polyline, Marker } from 'leaflet';
import './Map.css';
import { ICoordinate } from '../../App';

interface IMap {
    waypoints: ICoordinate[];
    setWaypoints: (waypoints: ICoordinate[]) => void;
}

const Map = ({ waypoints, setWaypoints }: IMap) => {
    const mapContainer = useRef(null);
    const mapRef = useRef<any>(null);
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [lines, setLines] = useState<Polyline[]>([]);

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
        // remove all elements from the map
        [...markers, ...lines].forEach(element => {
            mapRef.current.removeLayer(element);
        });

        let newMarkers: Marker[] = [];
        // Line at index 0 connects Marker 0 with Marker 1
        // Line at index 1 connects Marker 1 with Marker 2
        // --> For a Marker at index 0, the lines[index - 1] and lines[index] are relevant when changing position
        let newLines: Polyline[] = []

        waypoints.forEach((waypoint, index) => {
            newMarkers.push(marker([waypoint.lat, waypoint.long], {
                draggable: true,
                autoPan: true,
                icon: divIcon({
                    className: "waypoint-icon",
                    html: `<div>${index + 1}</div>`,
                    iconSize: [30, 30]
                })
            }).on("drag", (e) => {
                if (index - 1 >= 0) {
                    mapRef.current.removeLayer(newLines[index - 1])
                    newLines[index - 1] = polyline([[waypoints[index - 1].lat, waypoints[index - 1].long], [e.target._latlng.lat, e.target._latlng.lng]], {
                        color: 'blue',
                        fillColor: 'blue',
                        fillOpacity: 1,
                        weight: 5
                    }).addTo(mapRef.current);
                }
                if (index < waypoints.length) {
                    mapRef.current.removeLayer(newLines[index])
                    newLines[index] = polyline([[e.target._latlng.lat, e.target._latlng.lng], [waypoints[index + 1].lat, waypoints[index + 1].long]], {
                        color: 'blue',
                        fillColor: 'blue',
                        fillOpacity: 1,
                        weight: 5
                    }).addTo(mapRef.current);
                }
            }).on("dragend", (e) => {
                // update waypoints when done
                let newWaypoints = [...waypoints];
                newWaypoints[index] = {
                    lat: e.target._latlng.lat,
                    long: e.target._latlng.lng
                }
                setWaypoints(newWaypoints)
            }).addTo(mapRef.current));
        })

        waypoints.forEach((waypoint, index) => {
            // Draw line from current point to next one (except for last waypoint)
            if (index === waypoints.length - 1) {
                return;
            }
            newLines.push(polyline([[waypoint.lat, waypoint.long], [waypoints[index + 1].lat, waypoints[index + 1].long]], {
                color: 'blue',
                fillColor: 'blue',
                fillOpacity: 1,
                weight: 5
            }).addTo(mapRef.current));
        })
        mapRef.current.on('click', (e: any) => setWaypoints([...waypoints, { lat: e.latlng.lat, long: e.latlng.lng }]));
        setMarkers(newMarkers);
        setLines(newLines);
    }, [waypoints])

    return <div className="map-container" ref={mapContainer} />;
};

export default Map;
