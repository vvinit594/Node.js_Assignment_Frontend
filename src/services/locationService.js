/**
 * Location Service
 * API calls for location data (Countries, States, Cities)
 */

import api from './api';

const locationService = {
  // Get all countries
  getCountries: async (search = '') => {
    const params = search ? { search } : {};
    const response = await api.get('/locations/countries', { params });
    return response.data;
  },

  // Get states by country
  getStates: async (country) => {
    const response = await api.get(`/locations/states/${encodeURIComponent(country)}`);
    return response.data;
  },

  // Get cities by country and state
  getCities: async (country, state) => {
    const response = await api.get(
      `/locations/cities/${encodeURIComponent(country)}/${encodeURIComponent(state)}`
    );
    return response.data;
  },

  // Get country details
  getCountryDetails: async (country) => {
    const response = await api.get(`/locations/country-details/${encodeURIComponent(country)}`);
    return response.data;
  },
};

export default locationService;
