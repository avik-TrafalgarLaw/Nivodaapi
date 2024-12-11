import fetch from 'node-fetch';

const API_URL = 'https://intg-customer-staging.nivodaapi.net/api/diamonds';

// Replace with your valid token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM1YWRiZWM0LTRkZjQtNDhlMC1iY2RlLTMxZmYxYjgxOGE5MiIsInJvbGUiOiJDVVNUT01FUiIsInN1YnR5cGUiOm51bGwsImNvdW50cnkiOiJHQiIsInB0IjoiREVGQVVMVCIsImlmIjoiIiwiY2lkIjoiZTk3MDEyYzYtOGE3Ni00NzNmLTljZjctMzBlMGU2ZjI3MWRhIiwiZ2VvX2NvdW50cnkiOiJHQiIsImFwaSI6dHJ1ZSwiYXBpX2giOnRydWUsImFwaV9jIjp0cnVlLCJhcGlfbyI6dHJ1ZSwiYXBpX3IiOnRydWUsImlhdCI6MTczMzg4MTQ1OSwiZXhwIjoxNzMzOTY3ODU5fQ.Wgb2CuEW8l6QuKWmIbSEkDI1KyAyvDTI7kkTAdr6bfw'; // Replace with your actual token

// Query to fetch diamond by ID
const diamondByIdQuery = (diamondId) => `
  query {
    get_diamond_by_id(diamond_id: "${diamondId}") {
      id
      diamond {
        id
        certificate {
          certNumber
          shape
          fullShape
          lab
          image
          video
          country_of_origin
          canada_mark_eligible
        }
      }
      price
      discount
      markup_price
      markup_discount
    }
  }
`;

(async function () {
  try {
    const diamondId = "1bd0404d-a35d-40f6-bc32-562cf1973564"; // Replace with the actual diamond ID
    console.log('Querying diamond data by ID...');
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: diamondByIdQuery(diamondId) }),
    });

    const result = await response.json();

    // Handle potential errors
    if (result.errors) {
      console.error('Query Errors:', JSON.stringify(result.errors, null, 2));
      return;
    }

    // Extract and display diamond data
    const diamondData = result.data.get_diamond_by_id;
    console.log('Diamond Details:', JSON.stringify(diamondData, null, 2));
  } catch (error) {
    console.error('Unexpected Error:', error.message);
  }
})();
