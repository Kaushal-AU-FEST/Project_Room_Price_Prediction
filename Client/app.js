

// Function to get the value of the selected number of bathrooms
function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i = 0; i < uiBathrooms.length; i++) {
    if (uiBathrooms[i].checked) {
      return parseInt(uiBathrooms[i].value);
    }
  }
  return -1; // Invalid Value
}

// Function to get the value of the selected number of BHKs
function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i = 0; i < uiBHK.length; i++) {
    if (uiBHK[i].checked) {
      return parseInt(uiBHK[i].value);
    }
  }
  return -1; // Invalid Value
}

// Function to call the API and estimate the price
function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");

  var sqft = document.getElementById("uiSqft").value;
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations").value;
  var estPrice = document.getElementById("uiEstimatedPrice");

  // Backend API URL
  var url = "http://127.0.0.1:5000/predict_home_price";

  // Post request to the API
  $.post(url, {
    total_sqft: parseFloat(sqft),
    bhk: bhk,
    bath: bathrooms,
    location: location,
  }, function (data, status) {
    console.log(data.estimated_price);
    estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
    console.log(status);
  }).fail(function () {
    estPrice.innerHTML = "<h2>Error in API Call</h2>";
  });
}

// Function to load location names when the page loads
function onPageLoad() {
  console.log("Document loaded");

  // Backend API URL
  var url = "http://127.0.0.1:5000/get_location_names";

  // Get request to fetch locations
  $.get(url, function (data, status) {
    console.log("Received response for get_location_names request");
    if (data) {
      var locations = data.locations;
      var uiLocations = document.getElementById("uiLocations");
      $('#uiLocations').empty(); // Clear previous options
      for (var i in locations) {
        var opt = new Option(locations[i]);
        $('#uiLocations').append(opt);
      }
    }
  }).fail(function () {
    console.log("Error in fetching location names");
  });
}

// Attach onPageLoad to window.onload
window.onload = onPageLoad;
