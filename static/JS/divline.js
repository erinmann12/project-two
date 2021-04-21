function loadCharts(selectedYear) {

d3.json("./static/usa.json").then(function(data)
  {
    // console.log(years)
  
    var dyear=data.filter(d=>d.year == selectedYear)
   


    var d1=dyear.filter(d=>d.place_id== "DV_ENC" && d.frequency== "monthly")
    var d2=dyear.filter(d=>d.place_id== "DV_ESC" && d.frequency== "monthly")
    var d3=dyear.filter(d=>d.place_id== "DV_MA" && d.frequency== "monthly")
    var d4=dyear.filter(d=>d.place_id== "DV_MT" && d.frequency== "monthly")
    var d5=dyear.filter(d=>d.place_id== "DV_NE" && d.frequency== "monthly")
    var d6=dyear.filter(d=>d.place_id== "DV_PAC" && d.frequency== "monthly")
    var d7=dyear.filter(d=>d.place_id== "DV_SA" && d.frequency== "monthly")
    var d8=dyear.filter(d=>d.place_id== "DV_WNC" && d.frequency== "monthly")
    var d9=dyear.filter(d=>d.place_id== "DV_WSC" && d.frequency== "monthly")
    var period=d1.map(d=>d.period)
    var price=d1.map(d=>d.price)
    var period2=d2.map(d=>d.period)
    var price2=d2.map(d=>d.price)
    var period3=d3.map(d=>d.period)
    var price3=d3.map(d=>d.price)
    var period4=d4.map(d=>d.period)
    var price4=d4.map(d=>d.price)
    var period5=d5.map(d=>d.period)
    var price5=d5.map(d=>d.price)
    var period6=d6.map(d=>d.period)
    var price6=d6.map(d=>d.price)
    var period7=d7.map(d=>d.period)
    var price7=d7.map(d=>d.price)
    var period8=d8.map(d=>d.period)
    var price8=d8.map(d=>d.price)
    var period9=d9.map(d=>d.period)
    var price9=d9.map(d=>d.price)
    // console.log(price2)

    // Traces for the Housing Data
    var trace1 = {
      x: period,
      y: price,
      mode: 'lines',
      name: 'East North Central Division',
      line: {
        dash: 'solid',
        width: 4
      }
    };

    var trace2 = {
      x: period2,
      y: price2,
      mode: 'lines',
      name: 'East South Central Division',
      line: {
        dash: 'dashdot',
        width: 4
      }
    };

    var trace3 = {
      x: period3,
      y: price3,
      mode: 'lines',
      name: 'Middle Atlantic Division',
      line: {
        dash: 'solid',
        width: 4
      }
    };
     
    var trace4 = {
      x: period4,
      y: price4,
      mode: 'lines',
      name: 'Mountain Divisionn',
      line: {
        dash: 'dot',
        width: 4
      }
    };
     
    var trace5 = {
      x: period5,
      y: price5,
      mode: 'lines',
      name: 'New England Division',
      line: {
        dash: 'solid',
        width: 4
      }
    };
     
    var trace6 = {
      x: period6,
      y: price6,
      mode: 'lines',
      name: 'Pacific Division',
      line: {
        dash: 'dashdot',
        width: 4
      }
    };
     
    var trace7 = {
      x: period7,
      y: price,
      mode: 'lines',
      name: 'South Atlantic Division',
      line: {
        dash: 'solid',
        width: 4
      }
    };
     
    var trace8 = {
      x: period8,
      y: price8,
      mode: 'lines',
      name: 'West North Central Division',
      line: {
        dash: 'dot',
        width: 4
      }
    };
    
    var trace9 = {
      x: period9,
      y: price,
      mode: 'lines',
      name: 'West South Central Division',
      line: {
        dash: 'solid',
        width: 4
      }
    };
    
    // Apply layout
    var layout = {
      // width: 2000,
      // height: 1000,
      xaxis: {
        autorange: true,
        title: "Period (Month)"
        
      },
      yaxis: {
        autorange: true,
        title: "Price(Thousands)"
      },
      legend: {
        y: 0.5,
        traceorder: 'reversed',
        font: {
          size: 16
        }
      }
    };

    // // // Combining traces
    var traceData = [trace1, trace2,trace3, trace4, trace5, trace6, trace7, trace8, trace9];

    // // // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot", traceData, layout);
  }
)
}
function optionChanged(selectedID) {
  loadCharts(selectedID);
 };
loadCharts("2020")





 










