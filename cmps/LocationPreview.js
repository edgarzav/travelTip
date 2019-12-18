'use strict'
class LocationPreview {
    constructor(location) {
        this.id = getRandomID()
        this.location = location;
    }

    onDeleteLocation = (event) => {
        deleteLocation(this.location);
        renderList();
        event.stopPropagation();
    }

    render() {
        const { location } = this;
        const elTr = document.createElement('tr');
        elTr.innerHTML = `
        <td>${this.id}</td>
        <td>${location.info}</td>
        <td><button class="delete-btn">Delete</button></td>
        `
        elTr.querySelector('.delete-btn').onclick = this.onDeleteLocation;
        return elTr;
    }
}
