import axios from 'axios';

export const getAddressCoordinates = async (address) => {
  if (!address || typeof address !== 'string' || !address.trim()) {
    throw new Error('Invalid address provided');
  }
const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
  if (!mapboxToken) {
    throw new Error('Mapbox access token is not configured in VITE_MAPBOX_TOKEN');
  }

  const encodedAddress = encodeURIComponent(address.trim());
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json`;

  try {
    const response = await axios.get(url, {
      params: {
        access_token: mapboxToken,
        limit: 1,
      },
    });

    if (!response.data || !Array.isArray(response.data.features) || response.data.features.length === 0) {
      throw new Error(`No location found for address: ${address}`);
    }

    const [long, lat] = response.data.features[0].center;

    return { lat, lng: long };
  } catch (error) {
    const message = error.response && error.response.data ?
      `Mapbox API error: ${JSON.stringify(error.response.data)}` :
      error.message;
    throw new Error(`Unable to resolve address coordinates: ${message}`);
  }
};