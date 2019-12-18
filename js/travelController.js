
function init() {
    initMap();
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('myParam');
    var foo = getParameterByName('foo');
    console.log(foo);
    
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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
    centerUserLocation()
}


