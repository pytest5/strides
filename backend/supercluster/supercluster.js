const Supercluster = require("supercluster");

const index = new Supercluster({
  radius: 50, // Match Mapbox GL settings
  maxZoom: 14, // Match Mapbox GL maxZoom
}).load(points); // Load your points (as GeoJSON)
