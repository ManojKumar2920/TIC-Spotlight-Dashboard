"use client";

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapboxOverlay } from '@deck.gl/mapbox';
import { ScatterplotLayer } from '@deck.gl/layers';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3BvdGxpZ2h0LW1lZGlhIiwiYSI6ImNtNWtxbTJodTBvODIybHNmaXM1ZnF1azkifQ.nyvB-pNafRCIiOjd_CCHug';

const Map = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v9',
        center: [0.45, 51.47],
        zoom: 11,
      });

      map.on('load', () => {
        const deckOverlay = new MapboxOverlay({
          interleaved: true,
          layers: [
            new ScatterplotLayer({
              id: 'deckgl-circle',
              data: [{ position: [0.45, 51.47] }],
              getPosition: (d) => d.position,
              getFillColor: [255, 0, 0, 100],
              getRadius: 1000,
              beforeId: 'waterway-label',
            }),
          ],
        });

        map.addControl(deckOverlay as unknown as mapboxgl.IControl);
      });
    }
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
};

export default Map;

