
 d3.json("/api/v1.0/usa_line").then(function(data) {

 console.log(data) 

    var dates = data.data.map(d => d.year_period);
    var closingPrices = data.data.map(d => d["United States"]);

    console.log(dates)
    console.log(closingPrices)

    var trace1 = {
      type: "scatter",
      x: dates,
      y: closingPrices,
      line: {
        color: "#17BECF"
      }
    };

    var data = [trace1];

    var layout = {
      xaxis: {
        title: "Date (Year-Quarter)",
        autorange: true,
      },
      yaxis: {
        title: "Price (In thousands)",
        autorange: true,
      }
    };

    Plotly.newPlot("plot", data, layout);
  
});

