"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { Map as LeafletMap } from "leaflet";

const Map = () => {
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
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
    >
      <TileLayer 
      attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>' 
      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" 
      />
      <Marker position={[19.076, 72.877]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
