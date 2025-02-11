"use client"; // to ensure this is client-side code
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Leaflet map, only on the client side
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });

const Map = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // After component mount, mark as client-side
  }, []);

  if (!isClient) {
    return null; // Prevent SSR rendering until the component is client-side
  }

  return (
    <MapContainer center={[40.7128, -74.0060]} zoom={10} style={{ height: "500px" }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
    </MapContainer>
  );
};

export default Map;
