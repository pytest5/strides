const convertToGeoJson = (jsonData) => {
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

module.exports = convertToGeoJson;
