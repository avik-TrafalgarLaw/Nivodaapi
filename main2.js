import fetch from 'node-fetch';

const API_URL = 'https://intg-customer-staging.nivodaapi.net/api/diamonds';

// Replace with your valid token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM1YWRiZWM0LTRkZjQtNDhlMC1iY2RlLTMxZmYxYjgxOGE5MiIsInJvbGUiOiJDVVNUT01FUiIsInN1YnR5cGUiOm51bGwsImNvdW50cnkiOiJHQiIsInB0IjoiREVGQVVMVCIsImlmIjoiIiwiY2lkIjoiZTk3MDEyYzYtOGE3Ni00NzNmLTljZjctMzBlMGU2ZjI3MWRhIiwiZ2VvX2NvdW50cnkiOiJHQiIsImFwaSI6dHJ1ZSwiYXBpX2giOnRydWUsImFwaV9jIjp0cnVlLCJhcGlfbyI6dHJ1ZSwiYXBpX3IiOnRydWUsImlhdCI6MTczMzg4MTQ1OSwiZXhwIjoxNzMzOTY3ODU5fQ.Wgb2CuEW8l6QuKWmIbSEkDI1KyAyvDTI7kkTAdr6bfw'; // Replace with your actual token

// Query to fetch diamond by ID
const getDiamondByIdQuery = (diamondId) => `
  query {
    get_diamond_by_id(diamond_id: "${diamondId}") {
      id
      OrderItemId
      v360
      brown
      green
      blue
      gray
      other
      milky
      eyeClean
      mine_of_origin
      canada_mark_eligible
      forever_mark_eligible
      bowtie
      video
      image
      certificate {
        certNumber
        carats
        shape
      }
      availability
      supplier_video_link
      supplier {
        id
        name
      }
      approval_type
      final_price
      inclusions {
        inclusion_type
        severity
      }
      show_measurements
      show_certificate_number
      tracer_id
      delivery_time {
        min_days
        max_days
      }
      return_window
      CertificateType
      HoldId
      NivodaStockId
      location
      supplierStockId
    }
  }
`;

(async function () {
  try {
    const diamondId = "efb6c038-0902-43a0-a963-03c6aaf12a54"; // Replace with the actual diamond ID
    console.log('Querying diamond data by ID...');

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: getDiamondByIdQuery(diamondId) }),
    });

    const result = await response.json();

    // Handle potential errors
    if (result.errors) {
      console.error('Query Errors:', JSON.stringify(result.errors, null, 2));
      return;
    }

    // Extract and display diamond data
    const diamondData = result.data.get_diamond_by_id;
    if (diamondData) {
      console.log('Diamond Details:', JSON.stringify(diamondData, null, 2));
    } else {
      console.log('No diamond found with the specified ID.');
    }
  } catch (error) {
    console.error('Unexpected Error:', error.message);
  }
})();