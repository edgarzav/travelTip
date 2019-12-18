'use strict'
function init() {
    initMap();
    initMapListener()
}

function initMapListener() {
    const map = getMap()
    google.maps.event.addListener(map, 'click', function (event) {
        var prmUserDecision = Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        })
        prmUserDecision.then((result) => {
            if (result.value) {
                getGeoAddress(event.latLng.lat(), event.latLng.lng())
                    .then(ans => renderCurrLocation(ans))
                    .then(ans => addLocation(ans))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    });
}


function renderCurrLocation(location) {
    document.querySelector('.curr-location').innerHTML = location
    return location
}

function onDeleteAll() {
    var prmUserDecision = Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
    prmUserDecision.then((result) => {
        if (result.value) {
            document.querySelector('.team-list').innerHTML = '';

            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
}

function onSearch() {
    const address = document.querySelector('.search-input').value
    searchAddress(address)
}

function renderList() {
    const locations = getPlacesToRender();
    document.querySelector('.user-table').innerHTML = ''
    locations.forEach(location => {
        const locationPreview = new LocationPreview(location)
        const elTr = locationPreview.render()
        document.querySelector('.user-table').append(elTr)
    });
}

function onGetCurrLocation() {
    centerCurrLocation()
}


