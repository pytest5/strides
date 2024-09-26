import countriesPositionData from "../data/countriesPosition.json";

interface CountryPosition {
  latitude: number;
  longitude: number;
}

const countriesPositionDataTyped: Record<string, CountryPosition> =
  countriesPositionData;

interface Stride {
  country: string;
}

const fetchCountryCoords = (data: Stride[]) => {
  // fetch country data from db
  const allCountries = data?.map((i: Stride) => i.country);
  const uniqueCountries = allCountries?.reduce<string[]>(
    (a, c) => (a.includes(c) ? a : a.concat(c)),
    []
  );
  const uniqueCountriesWithCoords = uniqueCountries?.map((i) => ({
    name: i,
    coordinates: countriesPositionDataTyped[i] || undefined,
  }));

  return uniqueCountriesWithCoords;
};

export default fetchCountryCoords;
