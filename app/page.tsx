"use client"; // Ensures compatibility with Next.js (App Router)
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from 'next/head';


// Dynamically import the Map component with SSR disabled
const Map = dynamic(() => import("./components/map"), {
  ssr: false, // Disable SSR for the Map component
});

// Import the geocoding function (adjust the path as needed)
import { geocodeStoreLocations } from "./components/parse"; // Correct import

// Define the type for store locations
interface StoreLocation {
  id: number;
  name: string;
  lat: number;
  lng: number;
  type: string;
  address: string;
}

const StoresPage = () => {
  const [geocodedStoreLocations, setGeocodedStoreLocations] = useState<StoreLocation[]>([]);
  const [loading, setLoading] = useState(true);


  // Fetch and geocode store locations on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const stores = await geocodeStoreLocations(); // Geocode the addresses
        setGeocodedStoreLocations(stores); // Update state with geocoded data
      } catch (error) {
        console.error("Error geocoding store locations:", error);
      } finally {
        setLoading(false); // Set loading to false after geocoding is done
      }
    };

    fetchData();
  }, []);

  // Show a loading message while geocoding is in progress
  if (loading) {
    return <p>Loading store locations...</p>;
  }
  console.log(geocodedStoreLocations)


  // Render the Map component with geocoded store locations
  return (
    <>
      <Head>
        <title>Store Locator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Map geocodedStoreLocations={geocodedStoreLocations} />
      </div>
    </>
  );
};

export default StoresPage;