import React, { useEffect, useRef } from 'react';
import { map, tileLayer } from 'leaflet';
import './Map.css';

const Map = () => {
    const mapContainer = useRef(null);
    useEffect(() => {
        const initialState = {
            lng: 11.44567,
            lat: 47.30319,
            zoom: 11,
        };

        const leafletMap = map(mapContainer.current!).setView(
            [initialState.lat, initialState.lng],
            initialState.zoom
        );

        // This API key is for use only in stackblitz.com
        // Get your Geoapify API key on https://www.geoapify.com/get-started-with-maps-api
        // The Geoapify service is free for small projects and the development phase.
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(leafletMap);

        // mapIsReadyCallback(leafletMap);
    }, [mapContainer.current]);

    return <div className="map-container" ref={mapContainer}></div>;
};

export default Map;
