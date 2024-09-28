import countries from "../data/countries.json";

const fetchCountries = () => {
  // fetch country data from db
  const allCountries = stridesData.map((i) => i.country);

  const uniqueCountries = allCountries.reduce<string[]>(
    (a, c) => (a.includes(c) ? a : a.concat(c)),
    []
  );

  return uniqueCountries;
};

export default fetchCountries;
