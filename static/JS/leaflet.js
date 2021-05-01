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
  
  var selectYear = "1975"

  // Function that will determine the color of a state based on the percent yearly price change
  function chooseColor(state, data, year) {
      
      selected = data.filter(d => d.place_name == state && d.year == year)[0]

    console.log(selected)
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
    
  }
  
 


function drawMap(year) {
  
  var geojsondata = "./static/gz_2010_us_040_00_500k.json"
  // Grabbing our GeoJSON data..
  d3.json(link, function(data) {
    //   console.log(data)
    // Creating a geoJSON layer with the retrieved data
    
    
  // CHOROPLETH "SUBSTITUTE" FUNCTION

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
      },
      onEachFeature: onEachFeature
      
    }).addTo(myMap);

    //// Binding popups

    // L.choropleth(geojsonData, {
    //     valueProperty: , // which property in the features to use
    //     scale: [], // chroma.js scale - include as many as you like
    //     steps: , // number of breaks or steps in range
    //     mode: 'q', // q for quantile, e for equidistant, k for k-means
    //     style: {
    //         color: '#fff', // border color
    //         weight: 2,
    //         fillOpacity: 0.8
    //     },
    //     onEachFeature: function(feature, layer) {
    //         layer.bindPopup(feature.properties.value)
    //     }
    // }).addTo(map)
    

    // BIND POPUP

    // L.geoJson(data, {},
    //     onEachFeature: onEachFeature
    //     ).addTo(map);

    

    function onEachFeature(feature, layer) {
        // layer.unbindPopup()
        console.log(selectYear)
        correctYear = data.filter(d => d.year == selectYear)
        console.log(data)
        console.log(selected)
        try{

        layer.bindPopup('<h1>'+feature.properties.NAME+'</h1><p>Yeary Change: '+correctYear.filter(d => d.place_name == feature.properties.NAME)[0].yearly_change+'</p>');
        }

        catch{
            layer.bindPopup('<h1>'+feature.properties.NAME+'</h1>')
        }
    }
    
    

    // ADD LEGEND
    

   


    })
  });
}




// This function is called when a dropdown menu item is selected
function updateMap(selectedYear) {
selectYear = selectedYear
  console.log(selectedYear)
  
  // onResize(selectedYear); 
  drawMap(selectedYear);
  
  
}

drawMap("1975")

var legend = L.control({position: 'bottomleft'});

legend.onAdd = function () {


    var div = L.DomUtil.create('div', 'info legend');
        grades = [-3.5, -3, -2.5, -2, -1.5, -1, 0, 1, 1.5, 2, 2.5, 3, 3.5].reverse();
        labels = ["#1C8100", "#37921B",  "#52A436", "#6DB551", "#87C66C", "#A2D787", "#BDE9A2", "white", "#FECAE9", "#FEB4CF", "#FE9FB5", "#FE899B", "#FE7380", "#FE5D66", "#FE484C", "#FE3232"];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + labels[i] + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);



  