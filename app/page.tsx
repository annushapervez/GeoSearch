"use client"; // top of the file
import React from 'react';
import dynamic from "next/dynamic";

// Dynamically import the Map component with SSR disabled
const Map = dynamic(() => import("./components/map"), {
  ssr: false, // Disable SSR for the Map component
});

const StoresPage = () => {
  return (
    <div>
      <Map />
    </div>
  );
};

export default StoresPage;
