import stridesData from "../data/strides-global-clean.json";
import countriesPositionData from "../data/countriesPosition.json";

const fetchCountryCoords = () => {
  // fetch country data from db
  const allCountries = stridesData.map((i) => i.country);

  const uniqueCountries = allCountries.reduce<string[]>(
    (a, c) => (a.includes(c) ? a : a.concat(c)),
    []
  );
  const uniqueCountriesWithCoords = uniqueCountries.map((i) => ({
    name: i,
    coordinates: countriesPositionData[i],
  }));

  return uniqueCountriesWithCoords;
};

export default fetchCountryCoords;
