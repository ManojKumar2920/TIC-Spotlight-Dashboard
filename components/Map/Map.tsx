"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { Map as LeafletMap } from "leaflet";
import L from 'leaflet';

// Use require to import images as strings
const icon = require('leaflet/dist/images/marker-icon.png');
const iconShadow = require('leaflet/dist/images/marker-shadow.png');

const Map = () => {
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    
    L.Marker.prototype.options.icon = DefaultIcon;

    return () => {
      if (mapRef.current) {
        mapRef.current.off();
        mapRef.current.remove(); 
      }
    };
  }, []);

  return (
    <MapContainer
      center={[19.076, 72.877]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
      className="text-dark dark:text-white"
    >
      <TileLayer 
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>' 
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" 
      />
      <Marker position={[19.076, 72.877]}>
        <Popup>
          Mumbai
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
