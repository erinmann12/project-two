function createPRTable() {

    d3.json("/api/v1.0/puertorico").then(function(prdata) {

        console.log(prdata)

        var newprData = prdata.map(Object.values)
     
        console.log(newprData)

         
        buildInteractiveTable(newprData)

    });
}




function buildInteractiveTable (dataSet) {

  $(document).ready(function() {
    $('#summary-table').DataTable( {
        data: dataSet,
        columns: [
            { title: "Frequency" },
            { title: "hpi_type" },
            { title: "location" },
            { title: "period" },
            { title: "place_id" },
            { title: "place_name" },
            { title: "price" },
            { title: "purchase_type" },
            { title: "year" }
        ]
    } );
} );

}

createPRTable()