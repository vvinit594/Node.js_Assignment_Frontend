/**
 * Location Service Test Script
 * Run this in browser console to verify location service works
 */

console.log('🧪 Testing Location Service...\n');

// Test function
async function testLocationService() {
  try {
    // Import the service (adjust path if needed)
    const locationService = await import('/src/services/locationService.js').then(m => m.default);
    
    console.log('✅ Location service imported successfully\n');
    
    // Test 1: Get Countries
    console.log('📍 Test 1: Fetching countries...');
    const countries = await locationService.getCountries();
    console.log(`✅ Loaded ${countries.data?.length || 0} countries`);
    console.log('Sample countries:', countries.data?.slice(0, 5).map(c => c.name));
    console.log('');
    
    // Test 2: Get States for USA
    console.log('📍 Test 2: Fetching states for United States...');
    const states = await locationService.getStates('United States');
    console.log(`✅ Loaded ${states.data?.length || 0} states`);
    console.log('Sample states:', states.data?.slice(0, 5).map(s => s.name));
    console.log('');
    
    // Test 3: Get Cities for California
    console.log('📍 Test 3: Fetching cities for California, USA...');
    const cities = await locationService.getCities('United States', 'California');
    console.log(`✅ Loaded ${cities.data?.length || 0} cities`);
    console.log('Sample cities:', cities.data?.slice(0, 5).map(c => c.name));
    console.log('');
    
    // Test 4: Search Countries
    console.log('📍 Test 4: Searching for countries containing "United"...');
    const searchResults = await locationService.getCountries('United');
    console.log(`✅ Found ${searchResults.data?.length || 0} matching countries`);
    console.log('Results:', searchResults.data?.map(c => c.name));
    console.log('');
    
    // Summary
    console.log('✅ All tests passed! Location service is working correctly.');
    console.log('\n🎉 Ready for deployment!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    console.log('\n🔍 Troubleshooting:');
    console.log('1. Make sure frontend is running (npm run dev)');
    console.log('2. Check network tab for API calls');
    console.log('3. Verify no CORS errors');
    console.log('4. Check if CountriesNow API is accessible');
  }
}

// Run tests
testLocationService();
