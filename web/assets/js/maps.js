function getGeoCode(lat, lng) {
    const myLatLng = new google.maps.LatLng(lat, lng);
    new google.maps.Geocoder().geocode({location: myLatLng}, function (results) {
        console.log(results[0].formatted_address);
        var address = results[0].formatted_address.split(",");
        var addLength = address.length;
        var country = address[addLength - 1];
        var city = address[addLength - 2];
        var district = address[addLength - 3];

//            console.log('country: ' + country);
//            console.log('city: ' + city);
//            console.log('district: ' + district);


        var number = "";

        for (var i = 0; i < addLength - 3; i++) {
            if (address[i] !== "Unnamed Road") {
                if (i === addLength - 4) {
                    number += address[i];
                } else {
                    number += address[i] + ", ";
                }
            }
        }
        if (number === "Unnamed Road" || number === "") {
            number = "Không có địa chỉ";
        }

//            console.log('number: ' + number);

        $('#numberAddress').val(number);
        $('#districtAddress').val(district);
        $('#cityAddress').val(city);


    });
}


function myMap() {
    var myLatLng = {lat: 10.733476978551995, lng: 106.6552734375};
    var mytest;

    var mapProp = {
        center: new google.maps.LatLng(10.733476978551995, 106.6552734375),
        zoom: 17,
        fullscreenControl: false,
        streetViewControl: false

    };

    var map = new google.maps.Map(document.getElementById("map"), mapProp);

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map
    });


    google.maps.event.addListener(map, 'drag', function () {
//            console.log("drag");
        mytest = map.getCenter();
        marker.setPosition(map.getCenter());
    });

    google.maps.event.addListener(map, 'dragend', function () {
        getGeoCode(mytest.lat(), mytest.lng());
    });
}