"use client"; // Ensures compatibility with Next.js (App Router)

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import MapContainer and related components
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false } // Disable server-side rendering
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const useMap = dynamic(
  () => import("react-leaflet").then((mod) => mod.useMap),
  { ssr: false }
);

// Custom icons for different store types
const totalByWirelessIcon = new L.Icon({
  iconUrl: "/total-by-wireless.png", // Place this in /public/icons/
  iconSize: [35, 35],
});

const rainbowIcon = new L.Icon({
  iconUrl: "/rainbow.png", // Place this in /public/icons/
  iconSize: [35, 35],
});

// Store locations (Sample Data, Replace with Real Locations)
const storeLocations = [
  {
    id: 1,
    name: "Total by Wireless - NYC",
    lat: 40.7128,
    lng: -74.0060,
    type: "total-by-wireless",
    address: "123 Main St, New York, NY 10001",
  },
  {
    id: 2,
    name: "Total by Wireless - Brooklyn",
    lat: 40.6782,
    lng: -73.9442,
    type: "total-by-wireless",
    address: "456 Brooklyn Ave, Brooklyn, NY 11201",
  },
  {
    id: 3,
    name: "Rainbow Store - Newark",
    lat: 40.7357,
    lng: -74.1724,
    type: "rainbow",
    address: "789 Market St, Newark, NJ 07102",
  },
];

// Function to get the right icon
const getIcon = (type) => {
  switch (type) {
    case "total-by-wireless":
      return totalByWirelessIcon;
    case "rainbow":
      return rainbowIcon;
    default:
      return totalByWirelessIcon;
  }
};

// Home Button Component
const HomeButton = () => {
  const map = useMap(); // Access the map instance

  const handleHomeClick = () => {
    map.setView([40.7128, -74.0060], 10); // Reset to initial center and zoom
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "80px",
        left: "10px", // Move to the left side
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <button
        onClick={handleHomeClick}
        style={{
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px 12px",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          fontSize: "14px",
        }}
      >
        Home
      </button>
    </div>
  );
};

const StoreMap = () => {
  const [mapReady, setMapReady] = useState(false);
  const [filteredStores, setFilteredStores] = useState(storeLocations);
  const [selectedType, setSelectedType] = useState(""); // Store type filter state
  const [searchQuery, setSearchQuery] = useState(""); // Search bar state

  useEffect(() => {
    setMapReady(true);
  }, []);

  // Handle store type filter change
  const handleTypeFilter = (event) => {
    const type = event.target.value;
    setSelectedType(type);
    filterStores(type, searchQuery);
  };

  // Handle search query change
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterStores(selectedType, query);
  };

  // Filter stores by type and name/address
  const filterStores = (type, query) => {
    const filtered = storeLocations.filter((store) => {
      const matchesType = type ? store.type === type : true;
      const matchesSearch =
        store.name.toLowerCase().includes(query.toLowerCase()) ||
        store.address.toLowerCase().includes(query.toLowerCase());
      return matchesType && matchesSearch;
    });
    setFilteredStores(filtered);
  };

  return mapReady ? (
    <div style={{ height: "100vh", margin: 0 }}>
      {/* Filters */}
      <div
        style={{
          margin: "10px",
          zIndex: 9999,
          position: "absolute",
          top: 10,
          right: 10,
          display: "flex",
          gap: "10px",
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <input
          type="text"
          placeholder="Search by address"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "14px",
          }}
        />
        <select
          onChange={handleTypeFilter}
          value={selectedType}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          <option value="">All Stores</option>
          <option value="total-by-wireless">Total by Wireless</option>
          <option value="rainbow">Rainbow Store</option>
        </select>
      </div>

      {/* Map */}
      <MapContainer
        center={[40.7128, -74.0060]} // Center map on NYC
        zoom={10}
        style={{ height: "100%", width: "100%" }} // Full screen size without overflow
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {filteredStores.map((store) => (
          <Marker key={store.id} position={[store.lat, store.lng]} icon={getIcon(store.type)}>
            <Popup>
              <strong>{store.name}</strong><br />
              {store.address} {/* Display the address */}
            </Popup>
          </Marker>
        ))}
        <HomeButton /> {/* Add the Home Button */}
      </MapContainer>
    </div>
  ) : (
    <p>Loading map...</p>
  );
};

export default StoreMap;