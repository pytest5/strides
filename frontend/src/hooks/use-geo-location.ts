import { useEffect, useState } from "react";

export function useGeoLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const refresh = () => {
    setLocation(null);
    setError(null);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    function handleSuccess(position) {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    }

    function handleError(error) {
      setError(error.message);
    }

    const options = {
      enableHighAccuracy: false, // Set to false for faster response
      timeout: 50000,
      maximumAge: 60000, // Accept a cached location if it's less than 1 minute old
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
  }, []);

  return { location, error, refresh };
}
