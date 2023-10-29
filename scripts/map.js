
//map option
function initMap() {
    var options = {
        center: { lat: 47.378341957776115, lng: 8.540240971123316 },
        zoom: 13,
    }
    map = new google.maps.Map(document.getElementById("map"), options);



    //marker
    /*
    const marker = new google.maps.Marker ({
        position: {lat: 47.3599, lng:8.54924},
        map:map,
        icon:"images/marker.png"
        
       });
    */



    //add Markers to Array

    let MarkerArray = [
        {
            location: { lat: 47.3599, lng: 8.54924 },
            content: "Passwort"
        },
        {
            location: { lat: 47.3808, lng: 8.51448 },
            content: "MAXIM Theater"
        },
        {
            location: { lat: 47.3917, lng: 8.48918 },
            content: "Migros Klubschule Zürich"
        },
        {
            location: { lat: 47.3842, lng: 8.52396 },
            content: "ECAP Zürich"
        },
        {
            location: { lat: 47.3636, lng: 8.51111 },
            content: "Stiftung Stellennetz"
        },

    ]

    for (let i = 0; i < MarkerArray.length; i++) {
        addMarker(MarkerArray[i]);
    }

    // add Marker

    function addMarker(property) {
        const marker = new google.maps.Marker({
            position: property.location,
            map: map,
            icon: "images/marker.png",
        });

        const infowindow = new google.maps.InfoWindow({
            content: property.content,
        });

        marker.addListener("click", () => {
            infowindow.open({
                anchor: marker,
                map,
            });
        });
    }





}






