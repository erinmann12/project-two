function createstateTable() {

    d3.json("/api/v1.0/states").then(function(statedata) {

        console.log(statedata)

        var newstateData = statedata.map(Object.values)
     
        console.log(newstateData)

         
        buildInteractiveTable(newstateData)

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


createstateTable()
//createUSATable()
//createPRTable()





// function createUSATable() {

//     d3.json("/api/v1.0/usa").then(function(usadata) {

//         console.log(usadata)

//         var newusaData = usadata.map(Object.values)
     
//         console.log(newusaData)

         
//         buildInteractiveTable(newusaData)

//     });
// }


// function createPRTable() {

//     d3.json("/api/v1.0/puertorico").then(function(prdata) {

//         console.log(prdata)

//         var newprData = prdata.map(Object.values)
     
//         console.log(newprData)

         
//         buildInteractiveTable(newprData)

//     });
// }



// function createstateTable() {

//     d3.json("/api/v1.0/states").then(function(statedata) {

//         console.log(statedata)

//         var newstateData = statedata.map(Object.values)
     
//         console.log(newstateData)

         
//         buildInteractiveTable(newstateData)

//     });
// }

