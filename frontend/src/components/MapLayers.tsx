import React from "react";
import { Source, Layer, LayerProps } from "react-map-gl";
import stridesData from "../data/strides-global-clean.json";

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
    features: jsonData.map(({ id, latitude, longitude }) => ({
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

export const MapLayers = () => {
  const strides = stridesData;
  const mapMarkers = React.useMemo(
    () => convertJsonToGeoData(strides),
    [strides]
  );
  return (
    <Source
      id="strides-data"
      type="geojson"
      data={mapMarkers}
      cluster={true}
      clusterMaxZoom={14}
      clusterRadius={50}
    >
      {/* <Layer {...layerStyle} /> */}
      <Layer {...clusterLayer} />
      <Layer {...clusterCountLayer} />
      <Layer {...unclusteredPointLayer} />
    </Source>
  );
};
