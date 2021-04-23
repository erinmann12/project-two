//get data
fetch('/api/v1.0/quarterly_data')
.then(res => res.json())
.then(data=> {
   const totalStateData = data
   plotChart(totalStateData);
})

// function to plot the data
async function plotChart(data) {
   
   // set up SVG
   const svg = d3.select("#chart")
   const width = svg.node().clientWidth - 170;
   const height = svg.node().clientHeight;
   const ticker = 500;

   //get list of all dates
   const dateList = Array.from(Object.keys(data))
   console.log(dateList)
   const fontSize = 16;
   const rectProperties = {height: 20, padding: 10}
   const container = svg.append("g")
                           .classed("container", true)
                           .style("transform", "translateY(25px)")


   const widthScale = d3.scaleLinear()
   const axisTop = svg
                   .append('g')
                   .classed('axis', true)
                   .style("transform", "translate(10px, 20px)")
                   .call(d3.axisTop(widthScale))

   const update = (year_period) =>  {

        // get the particular date and chage requirements
        const presentData = Object.keys(data[year_period]).map(function(k) {
         return {key: [k], value: data[year_period][k]};
     });
       console.log(presentData);
       widthScale.domain([0, d3.max(Object.values(presentData), d => d.value)])
                 .range([0, width - fontSize - 50])

       axisTop                
           .transition()
           .duration(ticker / 1.2)
           .ease(d3.easeLinear)
           .call(d3.axisTop(widthScale))

      const sortedRange = [...presentData].sort((a,b) => b.value - a.value)

      //print ticker
       d3.select("#datelocation").text(year_period)

       //legend

        var labels = ["<$300K", "$300K+", "$400K+", "$500K+", "$600K+"]
        var legend = svg.selectAll("#legend")
        .data(labels)
        .enter()
        .append("g")

        legend.append("rect").attr("x",1065).attr("y",690).attr("width",15).attr("height",15).style("fill", "green")
        legend.append("rect").attr("x",1065).attr("y",710).attr("width",15).attr("height",15).style("fill", "blue")
        legend.append("rect").attr("x",1065).attr("y",730).attr("width",15).attr("height",15).style("fill", "yellow")
        legend.append("rect").attr("x",1065).attr("y",750).attr("width",15).attr("height",15).style("fill", "orange")
        legend.append("rect").attr("x",1065).attr("y",770).attr("width",15).attr("height",15).style("fill", "red")
        legend.append("text").attr("x", 1080).attr("y", 700).text("<$300K").style("font-size", "15px").attr("alignment-baseline","middle")
        legend.append("text").attr("x", 1080).attr("y", 720).text("$300K+").style("font-size", "15px").attr("alignment-baseline","middle")
        legend.append("text").attr("x", 1080).attr("y", 740).text("$400K+").style("font-size", "15px").attr("alignment-baseline","middle")
        legend.append("text").attr("x", 1080).attr("y", 760).text("$500K+").style("font-size", "15px").attr("alignment-baseline","middle")
        legend.append("text").attr("x", 1080).attr("y", 780).text("$600K+").style("font-size", "15px").attr("alignment-baseline","middle")
        
       container
           .selectAll("text")
           .data(presentData)
           .enter()
           .append("text")

       container
           .selectAll("text")
           .text(d => d.key + " " + "$" + d.value + "K")
           .transition()
           .delay(500)
           .attr("x", d => widthScale(d.value) + fontSize)
           .attr("y", (d,i) => sortedRange.findIndex(e => e.key === d.key) * (rectProperties.height + rectProperties.padding) + fontSize) 

       container
           .selectAll("rect")
           .data(presentData)
           .enter()
           .append("rect")

       container
           .selectAll("rect")
           .attr("x", 10)
           .transition()
           .delay(500)
           .attr("y", (d,i) => sortedRange.findIndex(e => e.key === d.key) * (rectProperties.height + rectProperties.padding))
           .attr("width", d => d.value <= 0? 0 : widthScale(d.value))
           .attr("height", 20)
           .attr("fill", d => colorScale(d.value))
   }

   for (const year_period of dateList) {
      update(year_period)
      await new Promise(done => setTimeout(() => done(), ticker));
   } 

}

function processEachDateData(data) {
   //remove previous date
   delete data.year_period

   return Object.entries(data)
           .map(key => ({key, value}))
}

//function to change colors based on value
const colorScale = function(value) {
   if (value < 300) {return "green"}
   else if (value < 400) {return "blue"}
   else if (value < 500) {return "yellow"}
   else if (value < 600) {return "orange"}
   else {return "red"}
}
