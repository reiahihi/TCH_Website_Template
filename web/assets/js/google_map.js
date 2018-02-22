var map, autocomplete;
var geocoder;
var defaultPostion = {
  lat: 10.776988,
  lng: 106.695072
};
var delta = 0.0001;
var LS = LocalStore("TheCoffeeHouse");
var currentPostionCache = {
  lat: 0,
  lng: 0
};
var mapMinHeight = 0;
var mapMaxHeight = 0;
var getLocation = false;
var extend = false;
var addheight = 0;
var data_strict = {};
var empty_input = false;
var validateAddress = false;
var personalAddresses = undefined;
$(document).ready(function() {
  $.get("/assets/data_state_district.json", function(data) {
    data_strict = data;
  });
  $("#numberAddress").keyup(function() {
    if ($(this).val() == "") {
      empty_input = true;
    } else {
      empty_input = false;
    }
  });
});
function positionCallback(pos) {
  var crd = pos.coords;
  var currentPostion = {
    lat: crd.latitude,
    lng: crd.longitude
  };
  currentPostionCache = currentPostion;
  map.panTo(currentPostion);
  getPositionLoc(currentPostion);
}
function getPositionLoc(gps) {
  currentPostionCache = gps;
  var location = findCacheLocation(gps);
  if (location) {
    return renderPosition(location);
  }
  geocoder.geocode(
    {
      location: gps
    },
    function(locations, status) {
      if (status !== "OK") {
        return console.log(status);
      }
      var location = locations[0];
      var locationList = LS.get("location") || [];
      var found = false;
      for (var loc of locationList) {
        if (
          loc.geometry.location.lat == location.geometry.location.lat &&
          loc.geometry.location.lng == location.geometry.location.lng
        ) {
          found = true;
        }
      }
      if (!found) {
        locationList.push(location);
        LS.set("location", locationList);
      }
      renderPosition(location);
    }
  );
}
function renderPosition(res) {
  $(".reload-location").css("opacity", 0);
  $("#my-current-location-button").show();
  $(".reload-location").hide();
  $("#my-current-location-button").css("opacity", "1");
  $("#my-current-location-button").css("pointer-events", "auto");
  var address = res.formatted_address.split(",");
  var addLength = address.length;
  var country = address[addLength - 1];
  var city = address[addLength - 2];
  var district = address[addLength - 3];
  var number = "";
  getLocation = true;
  for (var i = 0; i < addLength - 3; i++) {
    if (address[i] != "Unnamed Road") {
      if (i == addLength - 4) {
        number += address[i];
      } else {
        number += address[i] + ", ";
      }
    }
  }
  if (number == "Unnamed Road" || number == "") {
    number = "Không có địa chỉ";
  }
  if (checkCountry(country)) {
    var state = checkState(city);
    if (state) {
      var idDistrict = checkDistrict(district, state.index);
      if (idDistrict != 0) {
        validateAddress = true;
        $("#selected_address").val(res.place_id);
        $("#id_state").val(state.id);
        $("#id_district").val(idDistrict);
        $(".tch-warning-country").hide();
        $(".tch-warning-state").hide();
        $(".tch-warning-district").hide();
      } else {
        validateAddress = false;
        $(".tch-warning-country").hide();
        $(".tch-warning-state").hide();
        $(".tch-warning-district").show();
        $(".tch-warning-district").removeClass("hidden");
      }
    } else {
      validateAddress = false;
      $(".tch-warning-country").hide();
      $(".tch-warning-state").show();
      $(".tch-warning-state").removeClass("hidden");
      $(".tch-warning-district").hide();
    }
  } else {
    validateAddress = false;
    $(".tch-warning-country").show();
    $(".tch-warning-country").removeClass("hidden");
    $(".tch-warning-state").hide();
    $(".tch-warning-district").hide();
  }
  $("#cityAddress").val(city);
  $("#districtAddress").val(district);

  $("#formattedAddress").val(res.formatted_address);

  $("#lat").val(res.geometry.location.lat);
  $("#lng").val(res.geometry.location.lng);
  var text_address = "";
  if (res.name && res.name != "") {
    $("#numberAddress").val(res.name);
  } else {
    $("#numberAddress").val(number);
  }
  $("#shortAddress").val(number + ", " + district + ", " + city);
  if (empty_input) {
    $("#shortAddress").val("");
  }
  $(".loading-map").hide();
  $(".theme-mobile .loading-map-mobile").hide();
  $(".marker-google").css("opacity", 1);
}
function checkState(city) {
  for (var i = 0; i < data_strict.state.length; i++) {
    for (var x = 0; x < data_strict.state[i].name.length; x++) {
      if (data_strict.state[i].name[x] == city.trim()) {
        return { index: i, id: data_strict.state[i].id };
      }
    }
  }
  return 0;
}
function checkDistrict(district, index) {
  district = district
    .replace(/Quận/g, "")
    .replace(/ /g, "")
    .replace(/Huyện/g, "")
    .toLowerCase();
  for (var i = 0; i < data_strict.state[index].district.length; i++) {
    var district_dbs = data_strict.state[index].district[i].name
      .replace(/Quận/g, "")
      .replace(/Huyện/g, "")
      .replace(/ /g, "")
      .toLowerCase();
    if (district == district_dbs) return data_strict.state[index].district[i].id;
  }
}
function checkCountry(country) {
  if (country.trim() == "Việt Nam" || country.trim() == "Vietnam") {
    return true;
  }
  return false;
}
function initMap() {
  getLocation = false;
  try {
    $(".marker-google").css("opacity", 0);
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: defaultPostion,
      disableDefaultUI: true
    });
    geocoder = new google.maps.Geocoder();
    google.maps.event.addListener(map, "dragend", function() {
      getPositionLoc(this.getCenter());
    });
    var options = {
      enableHighAccuracy: true,
      maximumAge: 100,
      timeout: 60000
    };
    navigator.geolocation.getCurrentPosition(positionCallback, errorHandler, options);
  } catch (e) {
    console.log("Error: ", e.message);
  }
}
function expandMap() {
  try {
    if (getLocation) {
      $(".marker-google").css("opacity", 0);
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: defaultPostion,
        disableDefaultUI: true
      });
      geocoder = new google.maps.Geocoder();
      google.maps.event.addListener(map, "dragend", function() {
        getPositionLoc(this.getCenter());
      });
      var options = {
        enableHighAccuracy: true,
        maximumAge: 100,
        timeout: 60000
      };
      map.panTo(currentPostionCache);
      getPositionLoc(currentPostionCache);
    }
  } catch (e) {
    console.log("Error: ", e.message);
  }
}

function setupPersonalAddress(addresses) {
  personalAddresses = addresses.data;
  if (personalAddresses.length > 0) {
    fillPersonalAddress(0);
  }
}

function autocompleteGoogleMap() {
  var options = {
    types: [],
    componentRestrictions: {
      country: "vn"
    }
  };
  if (!autocomplete) {
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("numberAddress"),
      options
    );
    autocomplete.addListener("place_changed", fillInAddress);
    setTimeout(function() {
      if (personalAddresses.length > 0) {
        for (var i = 0; i < personalAddresses.length; i++) {
          $(".pac-container").append(
            '<div id="areasearch" class="pac-item" onmousedown="fillPersonalAddress(' +
              i +
              ')"><span class="pac-icon icon-airport"></span><span class="pac-item-query"><span class="pac-matched"></span><strong>' +
              personalAddresses[i].name +
              "</strong> - " +
              personalAddresses[i].address +
              "</span> <span>it's Working</span></div>"
          );
        }
      }
    }, 500);
  }
}
$("#numberAddress").click(function() {
  autocompleteGoogleMap();
});

function fillPersonalAddress(index) {
  var address = personalAddresses[index];
  var newPostion = {
    lat: parseFloat(address.latitude),
    lng: parseFloat(address.longitude)
  };
  $(".reload-location").css("opacity", 0);
  $("#my-current-location-button").show();
  $(".reload-location").hide();
  $("#my-current-location-button").css("opacity", "1");
  $("#my-current-location-button").css("pointer-events", "auto");
  $(".loading-map").hide();
  $(".theme-mobile .loading-map-mobile").hide();
  $(".marker-google").css("opacity", 1);
  $("#numberAddress").val(address.address);
  $("#id_state").val(address.state_id);
  $("#id_district").val(address.district_id);
  $("#selected_address").val(address.id);
  $("#lat").val(address.latitude);
  $("#lng").val(address.longitude);
  $("#cityAddress").val(address.state);
  $("#districtAddress").val(address.district);
  $("#formattedAddress").val(address.address);

  map.panTo(newPostion);
}

function fillInAddress() {
  var place = autocomplete.getPlace();
  renderPosition(place);
  var lat = place.geometry.location.lat();
  var lng = place.geometry.location.lng();
  var newPostion = {
    lat: lat,
    lng: lng
  };
  map.panTo(newPostion);
  // $("#selected_address").val("");
  //getPositionLoc(newPostion);
}
function backToMyCurrentLocation() {
  if ($(".map-container").css("opacity") == 0) {
    if (window.location.hash == "#menu" || window.location.hash == "#order") {
      first = true;
      $(".map-container").css("opacity", 1);
      $(".loading-map").css("opacity", 1);
      $(".map-container").slideToggle();
      $("#close-map").show();
      if (window.location.hash == "#menu") {
        $(".menu").slideToggle();
      }
    } else {
      $(".map-container").css("opacity", 1);
      $(".loading-map").css("opacity", 1);
      $(".iframe-main").slideToggle();
      $("#close-map").show();
      if (first == true) {
        $(".map-container").slideToggle();
      }
      first = true;
    }
  }
  navigator.geolocation.getCurrentPosition(positionCallback, errorHandler);
}
$("#my-current-location-button").click(function() {
  backToMyCurrentLocation();
  timeOutLocation();
});
function errorHandler(err) {
  console.warn("ERROR(" + err.code + "): " + err.message);
}
function findCacheLocation(gps) {
  var locationList = LS.get("location") || [];
  var minDelta = 10e9;
  var result = false;
  for (var loc of locationList) {
    var locGps = loc.geometry.location;
    var cst = (Math.abs(locGps.lat - gps.lat) + Math.abs(locGps.lng - gps.lng)) / 2;
    if (cst < delta && cst < minDelta) {
      minDelta = cst;
      result = loc;
    }
  }
  return result;
}
$(document).ready(function() {
  calcHeightGoogleMapMobile();
});
$(window).resize(function() {
  if (extend) {
    calcHeightGoogleMapMobileExtend();
  } else {
    calcHeightGoogleMapMobile();
  }
  expandMap();
});
function calcHeightGoogleMapMobile() {
  var windowheight = $(window).height();
  var headerheight = $(".header-mobile").height();
  addheight = $(".input-address-container").height();
  mapMinHeight = windowheight - headerheight - addheight - 130;
  mapMaxHeight = windowheight - headerheight - 40 - 34 - 90;
  $(".theme-mobile .map-container-mobile").css("height", mapMinHeight);
  $(".theme-mobile .loading-map-mobile").css("height", mapMinHeight);
}
function calcHeightGoogleMapMobileExtend() {
  var windowheight = $(window).height();
  var headerheight = $(".header-mobile").height();
  mapMinHeight = windowheight - headerheight - addheight - 130;
  mapMaxHeight = windowheight - headerheight - 40 - 34 - 90;
  $(".theme-mobile .map-container-mobile").css("height", mapMaxHeight);
  $(".theme-mobile .loading-map-mobile").css("height", mapMaxHeight);
}
$(".extend-map").click(function() {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    extend = false;
    $(".theme-mobile .tch-warning-address").css("display", "block");
    $(".map-container-mobile").css("height", mapMinHeight);
    $(".theme-mobile .loading-map-mobile").css("height", mapMinHeight);
    $(".theme-mobile #shortAddress").css("display", "none");
    $(".input-address-container").css("margin-bottom", "0");
    $("#cityAddress").css("display", "block");
    $(".fullAddress").css("display", "block");
    $("#districtAddress").css("display", "block");
    $("#numberAddress").css("display", "block");
    expandMap();
    $(".marker-google").css("top", 0);
  } else {
    $(this).addClass("active");
    extend = true;
    $(".theme-mobile .tch-warning-address").css("display", "none");
    $(".theme-mobile #shortAddress").css("display", "block");
    $(".input-address-container").css("margin-bottom", "19px");
    $(".fullAddress").css("display", "none");
    $("#cityAddress").css("display", "none");
    $("#districtAddress").css("display", "none");
    $("#numberAddress").css("display", "none");
    $(".map-container-mobile").css("height", mapMaxHeight);
    $(".theme-mobile .loading-map-mobile").show();
    expandMap();
    $(".theme-mobile .loading-map-mobile").css("height", mapMaxHeight);
  }
});
