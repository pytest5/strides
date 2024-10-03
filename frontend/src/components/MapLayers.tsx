import React from "react";
import { Source, Layer, LayerProps } from "react-map-gl";
import { useFetch } from "@/hooks/use-fetch";
import LoadingSpinner from "./LoadingSpinner";
import Supercluster from "supercluster";
import { useQuery } from "@tanstack/react-query";

// const index = new Supercluster({
//   radius: 50,
//   maxZoom: 14,
// }).load(points);

export const clusterLayer: LayerProps = {
  id: "clusters",
  type: "circle",
  source: "strides-data",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#94d2bd",
      100,
      "#e9d8a6",
      750,
      "#ee9b00",
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
  },
};

const clusterCountLayer: LayerProps = {
  id: "cluster-count",
  type: "symbol",
  source: "strides-data",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

export const unclusteredPointLayer: LayerProps = {
  id: "unclustered-point",
  type: "circle",
  source: "strides-data",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#11b4da",
    "circle-radius": 4,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};

const convertJsonToGeoData = (jsonData) => {
  return {
    type: "FeatureCollection",
    features: jsonData?.map(({ id, latitude, longitude }) => ({
      type: "Feature",
      geometry: {
        coordinates: [longitude, latitude],
        type: "Point",
      },
      properties: {
        id: id,
      },
    })),
  };
};

export const MapLayers = ({ zoom = 14, bbox }) => {
  // const { data, isPending } = useFetch("/api/strides/location", [
  //   "fetchStrideLocations",
  // ]);
  // const currMapMarkers = React.useMemo(
  //   () => convertJsonToGeoData(data),
  //   [data]
  // );

  const fetchClusters = async () => {
    const url = "/api/strides/clusters";
    console.log("fetching cluster body", { zoom, bbox });
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ zoom, bbox }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.log(error);
      }
    }
  };

  const { isPending, data: mapClusters } = useQuery({
    queryKey: ["fetchClusters", zoom, bbox],
    queryFn: fetchClusters,
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <Source
      id="strides-data"
      type="geojson"
      data={mapClusters}
      // data={currMapMarkers}
      // cluster={true}
      // clusterMaxZoom={14}
      // clusterRadius={50}
    >
      {/* <Layer {...layerStyle} /> */}
      <Layer {...clusterLayer} />
      <Layer {...clusterCountLayer} />
      <Layer {...unclusteredPointLayer} />
    </Source>
  );
};
