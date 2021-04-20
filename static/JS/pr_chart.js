d3.json("/api/v1.0/pr_monthly").then(function(prData){
    console.log(prData);

    year = prData.data.map(d => d.year_period);
    //console.log(year)
    price = prData.data.map(d => d["Puerto Rico"]);
    console.log(price)

    var trace1 = {
      x: year,
      y: price,
      type: 'scatter'
    }

    var data = [trace1];

    var layout = {
      xaxis: {
        title: "Year-Period"
      },
      yaxis: {
        title: "Single Family House Price (K)"
      }
    };
  
    Plotly.newPlot('chart1', data, layout);

})
  
