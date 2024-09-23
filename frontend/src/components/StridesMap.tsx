import Map, { Layer, Source } from "react-map-gl";
import React from "react";
import { MapLayers } from "./MapLayers.tsx";
import type { MapRef } from "react-map-gl";
import type { GeoJSONSource } from "mapbox-gl";
import { clusterLayer, unclusteredPointLayer } from "./MapLayers";

interface Coord {
  latitude: number;
  longitude: number;
  zoom: number;
}

export const StridesMap = React.forwardRef((props, ref) => {
  // const mapRef = React.useRef<MapRef>(null);

  const [viewState, setViewState] = React.useState<Coord>({
    latitude: 1.3521,
    longitude: 103.8198,
    zoom: 10.8,
  });

  React.useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = (): Coord | undefined => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setViewState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 10.8,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          return undefined;
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser");
      return undefined;
    }
  };

  const onClick = (event) => {
    console.log(event);
    const feature = event.features[0];
    const clusterId = feature?.properties.cluster_id;
    if (!clusterId) {
      return; // console.log("YO", event);
      // reverse geocode and do something here with the lat lon?
    }
    const mapboxSource = ref.current.getSource("strides-data") as GeoJSONSource;
    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }
      ref.current.easeTo({
        center: feature.geometry.coordinates,
        zoom,
        duration: 500,
      });
    });
  };

  return (
    <div>
      <Map
        reuseMaps
        onClick={onClick}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        {...viewState}
        onMove={(e) => setViewState(e.viewState)}
        style={{ width: "100%", height: "100vh" }}
        // mapStyle="mapbox://styles/mapbox/streets-v9"
        mapStyle="mapbox://styles/mapbox/dark-v11"
        // className="w-full border-3 border-red-500"
        interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
        ref={ref}
        onLoad={(event) => {
          console.log("Map has loaded", ref.current); // You can access mapRef.current here
        }}
      >
        <MapLayers />
      </Map>
    </div>
  );
});
