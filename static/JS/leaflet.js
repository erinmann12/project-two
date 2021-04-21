// Creating map object
var myMap = L.map("map", {
    center: [39.0119, -98.4842],
    zoom: 3
  });

var mygeoMap = null
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: "pk.eyJ1Ijoiam9ubW91bnQ0OTQiLCJhIjoiY2tuNmp2a254MGVzMjJyczl5anc5YjFiZyJ9._jgAPzqk0GGGK8czAIB_uA"
  }).addTo(myMap);
  
  // Use this link to get the geojson data.
  var link = "/api/v1.0/state_increase";

  console.log(link)
  
  // Function that will determine the color of a state based on the percent yearly price change
  function chooseColor(state, data, year) {
      
      selected = data.filter(d => d.place_name == state && d.year == year)[0]

    console.log(state)
    if(!selected)
        return "white"
    console.log(selected)
    console.log(selected.yearly_change)

    
    // postive home prices color scale
    if(selected.yearly_change >= 3.5)
        return "#1C8100"
    else if (selected.yearly_change >= 3)
        return "#37921B"
    else if (selected.yearly_change >= 2.5)
        return "#52A436"
    else if (selected.yearly_change >= 2)
        return "#6DB551"
    else if (selected.yearly_change >= 1.5)
        return "#87C66C"
    else if (selected.yearly_change >= 1)
        return "#A2D787"  
    else if (selected.yearly_change >= 0.5)
        return "#BDE9A2"
    else if (selected.yearly_change >= 0)
        return "#D8FABD"

    else if (selected.yearly_change == 0)
        return "white"

    // negative home prices color scale
    else if (selected.yearly_change >= -0.5)
        return "#FECAE9"
    else if(selected.yearly_change >= -1)
        return "#FEB4CF"
    else if (selected.yearly_change >= -1.5)
        return "#FE9FB5"
    else if (selected.yearly_change >= -2)
        return "#FE899B"
    else if (selected.yearly_change >= -2.5)
        return "#FE7380"
    else if (selected.yearly_change >= -3)
        return "#FE5D66"
    else if (selected.yearly_change >= -3.5)
        return "#FE484C"
    else (selected.yearly_change >= -60)
        return "#FE3232"
    
//     switch (state) {
//     case "Brooklyn":
//       return "yellow";
//     case "Bronx":
//       return "red";
//     case "Manhattan":
//       return "orange";
//     case "Queens":
//       return "green";
//     case "Staten Island":
//       return "purple";
//     default:
//       return "black";
//     }
  }


function drawMap(year) {
  
  var geojsondata = "./static/gz_2010_us_040_00_500k.json"
  // Grabbing our GeoJSON data..
  d3.json(link, function(data) {
      console.log(data)
    // Creating a geoJSON layer with the retrieved data
  
    d3.json(geojsondata, function(geo) {
        // console.log(geo)
      if(mygeoMap != undefined)
      mygeoMap.remove()
      mygeoMap = L.geoJson(geo, {
        style: function(feature) {
          return {
            color: "white",
            fillColor: chooseColor(feature.properties.NAME, data, year),
           fillOpacity: 0.5,
            weight: 1.5
         };
      }
    }).addTo(myMap);
    })
  });
}


// This function is called when a dropdown menu item is selected
function updateMap(selectedYear) {

  console.log(selectedYear)
  
  // onResize(selectedYear); 
  drawMap(selectedYear);
  
  
  // Use D3 to select the dropdown menu
  // var dropdownMenu = d3.select("#selDataset");
  // // Assign the value of the dropdown menu option to a variable
  // var dataset = dropdownMenu.property("value");

  // Initialize x and y arrays
  // var x = [];
  // var y = [];

  // if (dataset === 'dataset1') {
  //   x = [1, 2, 3, 4, 5];
  //   y = [1, 2, 4, 8, 16];
  // }

  // else if (dataset === 'dataset2') {
  //   x = [10, 20, 30, 40, 50];
  //   y = [1, 10, 100, 1000, 10000];
  // }

  // Note the extra brackets around 'x' and 'y'
//   Plotly.restyle("plot", "x", [x]);
//   Plotly.restyle("plot", "y", [y]);
}

drawMap("1975")



  