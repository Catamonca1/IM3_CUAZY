function initMap() {
    var options = {
        center: { lat: 47.378341957776115, lng: 8.540240971123316 },
        zoom: 12,
    }
    map = new google.maps.Map(document.getElementById("map"), options);    
}


function createMarkers(data) {

    //init the map if its not already inited
    if (typeof map === 'undefined') {
        initMap();
        console.log('inited map')
    }

    //loop through your filteredData array and create markers for each school
    data.forEach(school => {
        
        const marker = new google.maps.Marker({
            position: {
                lat: parseFloat(school.lat),
                lng: parseFloat(school.lng),
            },
            map: map,
            icon: "images/marker.png",
            //add more options if you want
        });

        // if you want, you can add an event listener to the marker, 
        // f.e.: to open an info window when clicked :)
        marker.addListener('click', function () {
            const infoWindow = new google.maps.InfoWindow({
                content: `<div class="infowindow"><strong>${school.name}</strong> <div>${school.website}</div> <div>${school.telephone}</div></div>`
            });
            infoWindow.open(map, marker);
        });
    });
}