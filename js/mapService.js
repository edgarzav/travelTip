'use strict'
let gMap
let gLocations = [];
let gIdx = 0;
function initMap() {
    var eilat = { lat: 29.559577, lng: 34.949694 };
    gMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: eilat
    });


    google.maps.event.addListener(gMap, 'click', function (event) {
        let lat = event.latLng.lat();
        let lng = event.latLng.lng();
        getGeoAddress(lat, lng)
            .then(ans => renderCurrLocation(ans))
            .then(ans => addLocation(ans))
    });
}
function addLocation(location) {
    gLocations.push(createLocation(location))
    renderList()
}

function deleteLocation(location) {
    const locationIndex = findTodoIndexById(location.id);
    gLocations.splice(locationIndex, 1);
}

function findTodoIndexById(locationId) {
    return gLocations.findIndex(location => locationId === location.id)
}

function getPlacesToRender() {
    return gLocations;
}

function createLocation(location) {
    return {
        id: gIdx++,
        info: location
    }
}

function renderCurrLocation(location) {
    document.querySelector('.curr-location').innerHTML = location
    return location
}


function getGeoAddress(lat, lng) {
    var prmAns = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAIvc2-vZY5K76K9fS1Mz2mEOLCjm1t6c0`)
    return prmAns.then((response) => {
        let { data } = response
        return data.results[0].formatted_address
    })
        .catch(err => {
            console.error(err);
        })
}


function searchAddress(address) {
    getGeoLatLng(address)
        .then(ans => setLocation(ans))
}


function getGeoLatLng(searchedAddress) {
    var prmAns = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+${searchedAddress}&key=AIzaSyAIvc2-vZY5K76K9fS1Mz2mEOLCjm1t6c0`)
    return prmAns.then((response) => {
        let { data } = response
        console.log(data);
        return data.results[0].geometry.location
        // return data.results[0].formatted_address
    })
        .catch(err => {
            console.error(err);
        })
}

function setLocation(pos) {
    gMap.setCenter(new google.maps.LatLng(pos.lat, pos.lng));
}

function centerUserLocation() {
    const infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Your location.');
            infoWindow.open(gMap);
            gMap.setCenter(pos);
            getGeoAddress(pos.lat, pos.lng)
                .then(ans => renderCurrLocation(ans))
                .then(ans => addLocation(ans))
        }, function () {
            handleLocationError(true, infoWindow, gMap.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, gMap.getCenter());
    }
}



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(gMap);
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(gMap);

}



