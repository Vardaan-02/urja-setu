import React, { useEffect, useState } from "react";

export default function useCurrentLocation({
  setCurrentPosition,
  event,
}: {
  setCurrentPosition: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number }>
  >;
  event?: any;
}) {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.log("Error fetching location:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [setCurrentPosition, event]);
}
