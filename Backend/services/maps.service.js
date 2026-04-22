const axios = require('axios');
const qs = require('qs'); // 👈 install: npm install qs
const  captainModel = require('../models/captain.model');

const graphhopperKey = process.env.GRAPHHOPPER_API_KEY;

// 🔹 Get coordinates from address
module.exports.getAddressCoordinates = async (address) => {
  if (!address || typeof address !== 'string' || !address.trim()) {
    throw new Error('Invalid address provided');
  }

  if (!graphhopperKey) {
    throw new Error('GRAPHHOPPER_API_KEY is not configured in .env');
  }

  const url = 'https://graphhopper.com/api/1/geocode';

  try {
    const response = await axios.get(url, {
      params: {
        q: address.trim(),
        limit: 1,
        locale: 'en',
        key: graphhopperKey,
      },
    });

    if (
      !response.data ||
      !Array.isArray(response.data.hits) ||
      response.data.hits.length === 0
    ) {
      throw new Error(`No location found for address: ${address}`);
    }

    const hit = response.data.hits[0];

    return {
      lat: hit.point.lat,
      lng: hit.point.lng,
    };
  } catch (error) {
    const message = error.response?.data
      ? JSON.stringify(error.response.data)
      : error.message;

    throw new Error(`Geocoding failed: ${message}`);
  }
};

// 🔹 Get distance & time
module.exports.getDistanceAndTime = async (origin, destination) => {
  if (
    !origin ||
    !destination ||
    typeof origin !== 'string' ||
    typeof destination !== 'string'
  ) {
    throw new Error('Invalid origin or destination provided');
  }

  if (!graphhopperKey) {
    throw new Error('GRAPHHOPPER_API_KEY is not configured in .env');
  }

  const cleanOrigin = origin.trim();
  const cleanDestination = destination.trim();

  try {
    // ✅ Step 1: Get coordinates
    const originCoords = await module.exports.getAddressCoordinates(cleanOrigin);
    const destCoords = await module.exports.getAddressCoordinates(cleanDestination);

    console.log('Origin:', originCoords);
    console.log('Destination:', destCoords);

    const url = 'https://graphhopper.com/api/1/route';

    // ✅ Step 2: Call GraphHopper route API
    const response = await axios.get(url, {
      params: {
        point: [
          `${originCoords.lat},${originCoords.lng}`,
          `${destCoords.lat},${destCoords.lng}`,
        ],
        vehicle: 'car',
        locale: 'en',
        key: graphhopperKey,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    });

    if (
      !response.data ||
      !Array.isArray(response.data.paths) ||
      response.data.paths.length === 0
    ) {
      throw new Error(
        `No route found between ${cleanOrigin} and ${cleanDestination}`
      );
    }

    const path = response.data.paths[0];

    return {
      distance: path.distance, // meters
      time: path.time, // milliseconds
    };
  } catch (error) {
    const message = error.response?.data
      ? JSON.stringify(error.response.data)
      : error.message;

    throw new Error(`Unable to calculate distance and time: ${message}`);
  }
};

// 🔹 Get distance & time from coordinates (no geocoding needed)
module.exports.getDistanceAndTimeFromCoordinates = async (originCoords, destCoords) => {
  if (
    !originCoords ||
    !destCoords ||
    typeof originCoords.lat !== 'number' ||
    typeof originCoords.lng !== 'number' ||
    typeof destCoords.lat !== 'number' ||
    typeof destCoords.lng !== 'number'
  ) {
    throw new Error('Invalid coordinates provided. Must have lat and lng as numbers.');
  }

  if (!graphhopperKey) {
    throw new Error('GRAPHHOPPER_API_KEY is not configured in .env');
  }

  const url = 'https://graphhopper.com/api/1/route';

  try {
    // Call GraphHopper route API directly with coordinates
    const response = await axios.get(url, {
      params: {
        point: [
          `${originCoords.lat},${originCoords.lng}`,
          `${destCoords.lat},${destCoords.lng}`,
        ],
        vehicle: 'car',
        locale: 'en',
        key: graphhopperKey,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    });

    if (
      !response.data ||
      !Array.isArray(response.data.paths) ||
      response.data.paths.length === 0
    ) {
      throw new Error(
        `No route found between the provided coordinates`
      );
    }

    const path = response.data.paths[0];

    return {
      distance: path.distance, // meters
      time: path.time, // milliseconds
    };
  } catch (error) {
    const message = error.response?.data
      ? JSON.stringify(error.response.data)
      : error.message;

    throw new Error(`Unable to calculate distance and time: ${message}`);
  }
};

module.exports.getAutoCompleteSuggestions = async (query) => {
  if (!query || typeof query !== 'string' || !query.trim()) {
    throw new Error('Invalid query provided');
  }

  if (!graphhopperKey) {
    throw new Error('GRAPHHOPPER_API_KEY is not configured in .env');
  }

  const url = 'https://graphhopper.com/api/1/geocode';

  try {
    const response = await axios.get(url, {
      params: {
        q: query.trim(),
        locale: 'en',
        key: graphhopperKey,
        limit: 5, // Limit suggestions to 5
      },
    });

    if (
      !response.data ||
      !Array.isArray(response.data.hits)
    ) {
      return []; // Return empty array if no suggestions
    }

    // Return suggestions with name and coordinates
    return response.data.hits.map(hit => ({
      name: hit.name,
      lat: hit.point.lat,
      lng: hit.point.lng,
    }));
  } catch (error) {
    const message = error.response?.data
      ? JSON.stringify(error.response.data)
      : error.message;

    throw new Error(`Autocomplete failed: ${message}`);
  }
};


module.exports.getCaptainsInTheRadius = async (location, radius) => {
  if (
    !location ||
    typeof location.lat !== "number" ||
    typeof location.lng !== "number"
  ) {
    throw new Error("Invalid location provided. Must have lat and lng as numbers.");
  }

  // radius in KM → convert to radians
  const radiusInRadians = radius / 6371; // Earth radius = 6371 km

  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [
          [location.lng, location.lat], // [lng, lat]
          radiusInRadians
        ]
      }
    },
    status: "active" // optional but recommended (only available captains)
  });

  return captains;
};