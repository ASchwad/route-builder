import React, { MutableRefObject, useEffect, useRef } from 'react';
import { map, tileLayer, polyline, marker, divIcon, Polyline, Marker, LatLngExpression, Map as MapClass, LeafletMouseEvent } from 'leaflet';
import './Map.css';
import { ICoordinate } from '../../App';
import { IRouteResult } from './types';

interface IMap {
    waypoints: ICoordinate[];
    setWaypoints: (waypoints: ICoordinate[]) => void;
}

function createNewPolyline(coordinates: LatLngExpression[] | LatLngExpression[][], mapRef: MutableRefObject<MapClass | undefined>) {
    return polyline(coordinates, {
        color: "#1086E8",
        fillColor: "#1086E8",
        fillOpacity: 1,
        weight: 5
    }).addTo(mapRef.current!);
}

const Map = ({ waypoints, setWaypoints }: IMap) => {
    const mapContainer = useRef(null);
    const mapRef = useRef<MapClass>();

    useEffect(() => {
        // sets the map to the coordinates
        const initialState = {
            lng: 11.533919891880805,
            lat: 47.22143353240336,
            zoom: 12,
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
        if (mapRef.current !== undefined) {
            let newMarkers: Marker[] = [];
            let newLines: Polyline[] = []

            waypoints.forEach((waypoint, index) => {
                newMarkers.push(marker([waypoint.lat, waypoint.long], {
                    draggable: true,
                    autoPan: true,
                    icon: divIcon({
                        className: "waypoint-icon",
                        html: `<div>${index + 1}</div>`,
                        iconSize: [20, 20]
                    })
                }).on("drag", (e) => {
                    // update lines to dragged waypoint
                    // Line at index 0 connects Marker 0 with Marker 1
                    // Line at index 1 connects Marker 1 with Marker 2
                    // --> For a Marker at index 0, the lines[index - 1] and lines[index] are relevant when changing position
                    if (index - 1 >= 0) {
                        mapRef.current!.removeLayer(newLines[index - 1])
                        newLines[index - 1] = createNewPolyline([[waypoints[index - 1].lat, waypoints[index - 1].long], [e.target._latlng.lat, e.target._latlng.lng]], mapRef)

                    }
                    if (index < waypoints.length - 1) {
                        mapRef.current!.removeLayer(newLines[index])
                        newLines[index] = createNewPolyline([[e.target._latlng.lat, e.target._latlng.lng], [waypoints[index + 1].lat, waypoints[index + 1].long]], mapRef);
                    }
                }).on("dragend", (e) => {
                    // update new position of waypoint 
                    let newWaypoints = [...waypoints];
                    newWaypoints[index] = {
                        lat: e.target._latlng.lat,
                        long: e.target._latlng.lng
                    }
                    setWaypoints(newWaypoints)
                }).addTo(mapRef.current!));
            })
            if (waypoints.length > 2) {
                waypoints.forEach((waypoint, index) => {
                    // Draw line from current point to next one (except for last waypoint)
                    if (index === waypoints.length - 1) {
                        return;
                    }
                    // Draw straight lines from point to point
                    // newLines.push(createNewPolyline([[waypoint.lat, waypoint.long], [waypoints[index + 1].lat, waypoints[index + 1].long]], mapRef));
                    var requestOptions = {
                        method: 'GET',
                    };
                    const fromWaypoint = waypoints[index].lat + "," + waypoints[index].long;
                    const toWaypoint = waypoints[index + 1].lat + "," + waypoints[index + 1].long;
                    // API key only accepted from https://aschwad.github.io/route-builder
                    fetch(`https://api.geoapify.com/v1/routing?waypoints=${fromWaypoint}|${toWaypoint}&mode=hike&apiKey=${process.env.REACT_APP_GEOAPIFY_KEY}`, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            let route: IRouteResult | undefined = result;
                            if (route?.statusCode !== 401 && route !== undefined) {
                                const coordinates = route.features[0].geometry.coordinates[0];
                                coordinates.forEach((currentCoordinate, index) => {
                                    // Draw line from current point to next one (except for last waypoint)
                                    if (index === coordinates.length - 1) {
                                        return;
                                    }
                                    createNewPolyline([[currentCoordinate[1], currentCoordinate[0]], [coordinates[index + 1][1], coordinates[index + 1][0]]], mapRef);
                                })
                            }
                        })
                        .catch(error => console.log('error', error));
                })
            }
            mapRef.current.on('click', (e: LeafletMouseEvent) => setWaypoints([...waypoints, { lat: e.latlng.lat, long: e.latlng.lng }]));

            return function cleanup() {
                // remove all elements from the map before each useEffect trigger and on unmount
                mapRef.current!.eachLayer(element => {
                    // Mitigate removal of tileLayer which has attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    if (element.getAttribution?.() === null) {
                        mapRef.current!.removeLayer(element);
                    }
                });
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [waypoints])

    return <div className="map-container" ref={mapContainer} />;
};

export default Map;
