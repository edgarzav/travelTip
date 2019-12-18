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
}

function getMap() {
    return gMap
}

function getPlacesToRender() {
    return gLocations;
}

function addLocation(location) {
    gLocations.push(createLocation(location))
    renderList()
}

function createLocation(location) {
    return { id: 0, info: location }
}

function deleteLocation(location) {
    const locationIndex = findTodoIndexById(location.id);
    gLocations.splice(locationIndex, 1);
}

function findTodoIndexById(locationId) {
    return gLocations.findIndex(location => locationId === location.id)
}

function getGeoAddress(lat, lng) {
    const prmAns = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAIvc2-vZY5K76K9fS1Mz2mEOLCjm1t6c0`)
    return prmAns.then((response) => {
        const { data } = response
        return data.results[0].formatted_address
    })
        .catch(err => {
            console.error(err);
        })
}

function getGeoLatLng(searchedAddress) {
    const prmAns = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchedAddress}&key=AIzaSyAIvc2-vZY5K76K9fS1Mz2mEOLCjm1t6c0`)
    return prmAns.then((response) => {
        const { data } = response
        return data.results[0].geometry.location
    })
        .catch(err => {
            console.error(err);
        })
}

function searchAddress(address) {
    getGeoLatLng(address)
        .then(ans => centerLocation(ans))
}


function centerLocation(pos) {
    gMap.setCenter(new google.maps.LatLng(pos.lat, pos.lng));
    gMap.setZoom(15);
    gMap.setCenter(pos);
}


function centerCurrLocation() {
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



