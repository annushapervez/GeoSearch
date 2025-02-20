"use client"; 
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from 'next/head';


const Map = dynamic(() => import("./components/map"), {
  ssr: false, 
});

import { geocodeStoreLocations } from "./components/parse"; 

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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const stores = await geocodeStoreLocations(); 
        setGeocodedStoreLocations(stores);
      } catch (error) {
        console.error("Error geocoding store locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading store locations...</p>;
  }
  console.log(geocodedStoreLocations)


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