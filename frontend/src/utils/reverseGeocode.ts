interface Props {
  longitude: number;
  latitude: number;
}

const reverseGeocode = async (data: Props) => {
  const { longitude, latitude } = data;
  const url = `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=${
    import.meta.env.VITE_MAPBOX_TOKEN
  }&types=address`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json.features[0].properties.name;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }

  // return "hi";
};

export default reverseGeocode;
