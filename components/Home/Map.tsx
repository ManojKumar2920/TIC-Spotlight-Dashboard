"use client";

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Deck } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import 'mapbox-gl/dist/mapbox-gl.css';

interface TaxiLocation {
  position: [number, number];
  id: string;
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const deckRef = useRef<Deck | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [taxiLocations, setTaxiLocations] = useState<TaxiLocation[]>([]);

  // Mumbai coordinates for random taxi generation
  // Covering major areas like South Mumbai, Bandra, Andheri, etc.
  const updateTaxiLocations = () => {
    const newLocations: TaxiLocation[] = Array.from({ length: 100 }, (_, i) => ({
      position: [
        72.8777 + (Math.random() - 0.5) * 0.2, // Mumbai longitude + random offset
        19.0760 + (Math.random() - 0.5) * 0.2, // Mumbai latitude + random offset
      ],
      id: `taxi-${i}`,
    }));
    setTaxiLocations(newLocations);
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map centered on Mumbai
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Dark theme for better visibility
      center: [72.8777, 19.0760], // Mumbai coordinates
      zoom: 11,
      antialias: true
    });

    mapRef.current = map;

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Initialize deck.gl
    const deck = new Deck({
      canvas: 'deck-canvas',
      width: '100%',
      height: '100%',
      initialViewState: {
        longitude: 72.8777,
        latitude: 19.0760,
        zoom: 11
      },
      controller: false,
      layers: [],
      onWebGLInitialized: () => {
        // @ts-ignore
        deck.setProps({ gl: mapRef.current?.getCanvas().getContext('webgl2') });
      }
    });

    deckRef.current = deck;

    map.on('load', () => {
      // Add some labels for major areas
      map.addLayer({
        id: 'area-labels',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [72.8777, 19.0760]
                },
                properties: {
                  title: 'Mumbai'
                }
              }
            ]
          }
        },
        layout: {
          'text-field': ['get', 'title'],
          'text-size': 16,
          'text-anchor': 'top'
        },
        paint: {
          'text-color': '#ffffff'
        }
      });

      map.on('render', () => {
        if (deckRef.current) {
          deckRef.current.setProps({
            viewState: {
              longitude: map.getCenter().lng,
              latitude: map.getCenter().lat,
              zoom: map.getZoom(),
              bearing: map.getBearing(),
              pitch: map.getPitch()
            }
          });
        }
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
      if (deckRef.current) {
        deckRef.current.finalize();
      }
    };
  }, []);

  useEffect(() => {
    if (deckRef.current) {
      deckRef.current.setProps({
        layers: [
          new ScatterplotLayer({
            id: 'taxi-layer',
            data: taxiLocations,
            getPosition: (d: TaxiLocation) => d.position,
            getFillColor: [255, 204, 0, 180], // Yellow color for taxis
            getRadius: 40,
            radiusMinPixels: 4,
            radiusMaxPixels: 15,
            pickable: true,
            onClick: (info) => {
              console.log('Clicked taxi:', info.object);
            }
          })
        ]
      });
    }
  }, [taxiLocations]);

  useEffect(() => {
    updateTaxiLocations();
    const interval = setInterval(updateTaxiLocations, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} style={{ width: '100%', height: '100%', position: 'absolute' }} />
      <canvas
        id="deck-canvas"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          pointerEvents: 'none'
        }}
      />
      <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white p-2 rounded">
        Active Taxis: {taxiLocations.length}
      </div>
    </div>
  );
};

export default Map;