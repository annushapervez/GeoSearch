"use client";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"

const totalByWirelessIcon = new L.Icon({
  iconUrl: "/total-by-wireless.png", 
  iconSize: [35, 35],
});

const rainbowIcon = new L.Icon({
  iconUrl: "/rainbow.png", 
  iconSize: [35, 35],
});

const rentACenterIcon = new L.Icon({
  iconUrl: "/rentacenter.png", 
  iconSize: [35, 35],
});

const cricketIcon = L.divIcon({
  className: "custom-icon",
  html: `<div class="round-icon" style="background-image: url('/cricket.png');"></div>`,
  iconSize: [35, 35],
});

const metroPCIcon = L.divIcon({
  className: "custom-icon",
  html: `<div class="round-icon" style="background-image: url('/metro.png');"></div>`,
  iconSize: [35, 35],
});

const boostIcon = new L.Icon({
  iconUrl: "/boost.png",
  iconSize: [35, 35],
});

const getIcon = (type) => {
  switch (type) {
    case "total-by-wireless":
      return totalByWirelessIcon;
    case "rainbow":
      return rainbowIcon;
    case "rentacenter":
      return rentACenterIcon;
    case "cricket":
      return cricketIcon;
    case "metropc":
      return metroPCIcon;
    case "boost":
      return boostIcon;
    default:
      return totalByWirelessIcon;
  }
};


const StoreMap = ({ geocodedStoreLocations }) => {
  const [mapReady, setMapReady] = useState(false);
  const [filteredStores, setFilteredStores] = useState(geocodedStoreLocations);
  const [selectedType, setSelectedType] = useState(""); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    setMapReady(true);
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust for mobile view
    };
  
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
     }, []);

     const HomeButton = () => {
      const map = useMap(); 
    
      const handleHomeClick = () => {
        map.setView([40.7128, -74.0060], 10); 
      };
    
      return (
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: "10px", 
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
        borderRadius: "8px",
        padding: "8px 12px",
        fontSize: "14px",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      Home
    </button>
        </div>
      );
    };
    

  const handleTypeFilter = (event) => {
    const type = event.target.value;
    setSelectedType(type);
    filterStores(type, searchQuery);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterStores(selectedType, query);
  };

  const filterStores = (type, query) => {
    const filtered = geocodedStoreLocations.filter((store) => {
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
<div
  style={{
    margin: "10px",
    zIndex: 9999,
    position: "absolute",
    top: isMobile ? "auto" : 10,
    bottom: isMobile ? 10 : "auto",
    right: isMobile ? "50%" : 10,
    left: isMobile ? "50%" : "auto",
    transform: isMobile ? "translateX(-50%)" : "none",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: "10px",
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    width: isMobile ? "90%" : "auto",
    textAlign: isMobile ? "center" : "left",
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
          <option value="rentacenter">Rent a Center</option>
          <option value="cricket">Cricket</option>
          <option value="boost">Boost Mobile</option>
          <option value="metropc">Metro PCs</option>


        </select>
      </div>

      <MapContainer
  center={[40.7128, -74.0060]}
  zoom={10}
  style={{
    height: isMobile ? "80vh" : "100vh", 
    width: "100%",
  }}
>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
       <MarkerClusterGroup
       maxClusterRadius={50} 
        disableClusteringAtZoom={15} 
      >
        {filteredStores.map((store) => (
          <Marker
            key={store.id}
            position={[store.lat, store.lng]}
            icon={getIcon(store.type)}
          >
            <Popup>
              <strong>{store.name}</strong>
              <br />
              {store.address}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
        <HomeButton /> 
      </MapContainer>
    </div>
  ) : (
    <p>Loading map...</p>
  );
};

export default StoreMap;

//no matter how much i zoom in i should always have access to  the side options, filtering? 