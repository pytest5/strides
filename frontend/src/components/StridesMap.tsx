import Map, { Layer, Source } from "react-map-gl";
import React from "react";
import { MapLayers } from "./MapLayers.tsx";
import type { MapRef, GeoJSONSource } from "react-map-gl";
import { clusterLayer, unclusteredPointLayer } from "./MapLayers";

interface Coord {
  latitude: number;
  longitude: number;
  zoom: number;
  test?: "";
}

const StridesMap = React.forwardRef<MapRef>((props, ref: React.Ref<MapRef>) => {
  const [bbox, setBbox] = React.useState();
  const [viewState, setViewState] = React.useState<Coord>({
    latitude: 1.3521,
    longitude: 103.8198,
    zoom: 10.4,
  });
  const initialLoadRef = React.useRef(true);

  React.useEffect(() => {
    const location = getUserLocation();
    if (location) {
      setViewState(location);
    }
  }, []);

  const getUserLocation = (): Coord | undefined => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setViewState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 10.4,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          return undefined;
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 600000,
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser");
      return undefined;
    }
  };

  const onClick = (event) => {
    const features = event.features;
    if (!features.length) return;
    const feature = features[0];
    // Check if the clicked feature is a cluster
    if (feature.properties && feature.properties.cluster) {
      // const clusterId = feature.properties.cluster_id;
      const mapboxSource = ref.current.getSource(
        "strides-data"
      ) as GeoJSONSource;

      if (!mapboxSource) {
        console.error("Source 'strides-data' not found");
        return;
      }
      ref.current.flyTo({
        center: feature.geometry.coordinates,
        zoom: viewState.zoom < 9 ? viewState.zoom + 4 : viewState.zoom + 1,
        duration: 1200,
      });
    } else {
      console.log("clicked on an unclustered point ", feature);
    }
  };

  const onIdle = () => {
    if (ref.current && initialLoadRef.current) {
      const bounds = ref.current.getBounds().toArray().flat();
      console.log("Initial bounds on load:", bounds);
      setBbox(bounds); // Set bbox once during the initial load
      initialLoadRef.current = false; // Set to false after the first load
    }
  };

  const onMoveEnd = (e) => {
    setViewState({
      longitude: e.viewState.longitude,
      latitude: e.viewState.latitude,
      zoom: e.viewState.zoom,
    });
    if (ref.current) {
      const bounds = ref.current.getBounds().toArray().flat();
      setBbox(bounds);
    }
  };

  const memoizedMapLayers = React.useMemo(
    () => (
      <MapLayers
        zoom={viewState.zoom}
        bbox={bbox}
        isInitialLoad={initialLoadRef.current}
      />
    ),
    [viewState.zoom, bbox]
  );

  // if (!bbox) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      <Map
        reuseMaps
        onClick={onClick}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        // {...viewState}
        initialViewState={viewState}
        onIdle={onIdle}
        // onZoom={(e) => setViewState({ ...viewState, zoom: e.viewState.zoom })} // Update zoom
        style={{ width: "100%", height: "100vh" }}
        // mapStyle="mapbox://styles/mapbox/streets-v9"
        mapStyle="mapbox://styles/mapbox/dark-v11?optimize=true"
        // className="w-full border-3 border-red-500"
        interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
        ref={ref}
        onMoveEnd={onMoveEnd}
      >
        {bbox && memoizedMapLayers}
      </Map>
    </div>
  );
});

export default StridesMap;
