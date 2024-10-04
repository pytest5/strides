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
    zoom: 9.8,
  });

  console.log("current zoom ", viewState.zoom);
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
            zoom: 10.4,
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

  // const onClick = (event) => {
  //   const features = event.features;

  //   if (!features.length) return;
  //   const feature = features[0];
  //   console.log(feature);
  //   const clusterId = feature?.properties.cluster_id;
  //   if (!clusterId) {
  //     return;
  //     // reverse geocode and do something here with the lat lon?
  //   }
  //   const mapboxSource = ref.current.getSource(
  //     "strides-data"
  //   ) as GeoJSONSource;
  //   mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
  //     if (err) {
  //       return;
  //     }
  //     ref.current.easeTo({
  //       center: feature.geometry.coordinates,
  //       zoom,
  //       duration: 500,
  //     });
  //   });
  // };
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
      // mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      //   if (err) {
      //     console.error("Error expanding cluster:", err);
      //     return;
      //   }
      //   ref.current.flyTo({
      //     center: feature.geometry.coordinates,
      //     zoom: zoom,
      //     duration: 500,
      //   });
      // });
    } else {
      console.log("clicked on an unclustered point ", feature);
    }
  };
  return (
    <div>
      <Map
        reuseMaps
        onClick={onClick}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        // {...viewState}
        initialViewState={viewState}
        onMove={(e) => {
          // setViewState(e.viewState);
          // if (ref.current) {
          //   const bounds = ref.current.getBounds().toArray().flat();
          //   console.log(bounds);
          //   setBbox(bounds);
          // }
        }}
        onIdle={(e) => {
          if (ref.current) {
            console.log("onload of map");
            const bounds = ref.current.getBounds().toArray().flat();
            console.log(bounds);
            setBbox(bounds);
          }
          console.log("onload wrong");
        }}
        // onZoom={(e) => setViewState({ ...viewState, zoom: e.viewState.zoom })} // Update zoom
        style={{ width: "100%", height: "100vh" }}
        // mapStyle="mapbox://styles/mapbox/streets-v9"
        mapStyle="mapbox://styles/mapbox/dark-v11?optimize=true"
        // className="w-full border-3 border-red-500"
        interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
        ref={ref}
        onMoveEnd={(e) => {
          setViewState({
            ...viewState,
            longitude: e.viewState.longitude,
            latitude: e.viewState.latitude,
            zoom: e.viewState.zoom,
          });
          if (ref.current) {
            const bounds = ref.current.getBounds().toArray().flat();
            console.log(bounds);
            setBbox(bounds);
          }
        }}
      >
        {bbox && <MapLayers zoom={viewState.zoom} bbox={bbox} />}
      </Map>
    </div>
  );
});

export default StridesMap;
