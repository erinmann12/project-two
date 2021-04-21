function createUSATable() {

    d3.json("/api/v1.0/usa").then(function(usadata) {

        console.log(usadata)

        var newusaData = usadata.map(Object.values)
     
        console.log(newusaData)

         
        buildInteractiveTable(newusaData)

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

createUSATable()