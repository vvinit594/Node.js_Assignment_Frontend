/**
 * Location Service
 * Direct integration with CountriesNow API (no backend needed)
 * API Documentation: https://documenter.getpostman.com/view/1134062/T1LJjU52
 */

import axios from 'axios';

const BASE_URL = 'https://countriesnow.space/api/v0.1';

// Create axios instance for location API
const locationApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const locationService = {
  /**
   * Get all countries
   * @param {string} search - Optional search term to filter countries
   * @returns {Promise<Object>} Response with countries array
   */
  getCountries: async (search = '') => {
    try {
      const response = await locationApi.get('/countries');
      
      if (response.data.error) {
        throw new Error(response.data.msg);
      }

      // Extract country names
      let countries = response.data.data.map(country => ({
        name: country.country,
        iso2: country.iso2,
        iso3: country.iso3
      }));

      // Apply search filter if provided
      if (search) {
        countries = countries.filter(country =>
          country.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      return {
        success: true,
        count: countries.length,
        data: countries.sort((a, b) => a.name.localeCompare(b.name))
      };
    } catch (error) {
      console.error('Error fetching countries:', error.message);
      // Return fallback list of popular countries
      return {
        success: true,
        data: [
          { name: 'United States', iso2: 'US', iso3: 'USA' },
          { name: 'United Kingdom', iso2: 'GB', iso3: 'GBR' },
          { name: 'Canada', iso2: 'CA', iso3: 'CAN' },
          { name: 'Australia', iso2: 'AU', iso3: 'AUS' },
          { name: 'India', iso2: 'IN', iso3: 'IND' },
          { name: 'Germany', iso2: 'DE', iso3: 'DEU' },
          { name: 'France', iso2: 'FR', iso3: 'FRA' },
          { name: 'Japan', iso2: 'JP', iso3: 'JPN' },
          { name: 'China', iso2: 'CN', iso3: 'CHN' },
          { name: 'Brazil', iso2: 'BR', iso3: 'BRA' }
        ]
      };
    }
  },

  /**
   * Get states for a specific country
   * @param {string} country - Country name
   * @returns {Promise<Object>} Response with states array
   */
  getStates: async (country) => {
    try {
      if (!country) {
        throw new Error('Country name is required');
      }

      const response = await locationApi.post('/countries/states', {
        country: country
      });

      if (response.data.error) {
        throw new Error(response.data.msg);
      }

      const states = response.data.data.states.map(state => ({
        name: state.name,
        state_code: state.state_code
      }));

      return {
        success: true,
        country: country,
        count: states.length,
        data: states.sort((a, b) => a.name.localeCompare(b.name))
      };
    } catch (error) {
      console.error('Error fetching states:', error.message);
      // Return empty array if API fails
      return {
        success: false,
        country: country,
        count: 0,
        data: [],
        message: 'Could not fetch states. Please enter manually.'
      };
    }
  },

  /**
   * Get cities for a specific state and country
   * @param {string} country - Country name
   * @param {string} state - State name
   * @returns {Promise<Object>} Response with cities array
   */
  getCities: async (country, state) => {
    try {
      if (!country || !state) {
        throw new Error('Both country and state are required');
      }

      const response = await locationApi.post('/countries/state/cities', {
        country: country,
        state: state
      });

      if (response.data.error) {
        throw new Error(response.data.msg);
      }

      const cities = response.data.data.map(city => ({ name: city }));
      
      return {
        success: true,
        country: country,
        state: state,
        count: cities.length,
        data: cities.sort((a, b) => a.name.localeCompare(b.name))
      };
    } catch (error) {
      console.error('Error fetching cities:', error.message);
      // Return empty array if API fails
      return {
        success: false,
        country: country,
        state: state,
        count: 0,
        data: [],
        message: 'Could not fetch cities. Please enter manually.'
      };
    }
  },

  /**
   * Get country details including states
   * @param {string} country - Country name
   * @returns {Promise<Object>} Country details with states
   */
  getCountryDetails: async (country) => {
    try {
      if (!country) {
        throw new Error('Country name is required');
      }

      const response = await locationApi.post('/countries/states', {
        country: country
      });

      if (response.data.error) {
        throw new Error(response.data.msg);
      }

      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error fetching country details:', error.message);
      return {
        success: false,
        data: null,
        message: `Failed to fetch details for ${country}`
      };
    }
  }
};

export default locationService;
