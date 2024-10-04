import { Source, Layer, LayerProps } from "react-map-gl";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";

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

type Props = {
  zoom: number;
  bbox: [];
  isInitialLoad: boolean;
};

export const MapLayers = ({ zoom = 14, bbox, isInitialLoad }: Props) => {
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

      console.log("fetched clusters data", json);
      return json;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        throw error;
      } else {
        console.log(error);
        throw error;
      }
    }
  };

  const { isPending, data: mapClusters } = useQuery({
    queryKey: ["fetchClusters", zoom, bbox],
    queryFn: fetchClusters,
    enabled: !!bbox,
    staleTime: 100000,
  });

  if (!mapClusters && isInitialLoad) {
    return <LoadingSpinner className="text-gray-200" />;
  }

  // if (isPending) {
  //   return <LoadingSpinner />;
  // }

  return (
    <Source
      id="strides-data"
      type="geojson"
      data={mapClusters} // Default to empty GeoJSON
    >
      <Layer {...clusterLayer} />
      <Layer {...clusterCountLayer} />
      <Layer {...unclusteredPointLayer} />
    </Source>
  );
};
