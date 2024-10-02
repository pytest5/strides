import { useEffect, useState } from "react";
import { useTriggerToast } from "./use-trigger-toast";
import { Location } from "@/services/stridesService";

export function useGeoLocation() {
  const [location, setLocation] = useState<Location | null>();
  const [isLocationGranted, setIsLocationGranted] = useState<boolean>();
  const [error, setError] = useState<string | null>();
  const triggerToast = useTriggerToast();

  const refresh = () => {
    setLocation(null);
    setError(null);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    function handleSuccess(position: GeolocationPosition) {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      triggerToast("locationObtained", {
        data: JSON.stringify({ latitude, longitude }, null, 4),
      });
      console.log("Triggering toast now");
    }

    function handleError(error: GeolocationPositionError) {
      setError(error.message);
      triggerToast("locationError", { type: "destructive" });
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 50000,
      maximumAge: 60000, // Accept a cached location if it's less than 1 minute old
    };

    // https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API/Using_the_Permissions_API
    navigator.permissions.query({ name: "geolocation" }).then((res) => {
      console.log(res.state);
      if (res.state === "prompt") {
        navigator.geolocation.getCurrentPosition(
          handleSuccess,
          handleError,
          options
        );
      } else if (res.state === "denied") {
        setIsLocationGranted(false);
        setError("Location access denied.");
        triggerToast("locationDenied", { type: "destructive" });
      } else if (res.state === "granted") {
        setIsLocationGranted(true);
        triggerToast("gettingLocation");
        navigator.geolocation.getCurrentPosition(
          handleSuccess,
          handleError,
          options
        );
      }
    });
  }, []);

  return { location, error, refresh, isLocationGranted };
}
