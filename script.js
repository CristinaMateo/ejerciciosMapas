//1. Utiliza Leaflet para posicionarte en un mapa
        
const MAPBOX_API = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'

//navigator.geolocation.getCurrentPosition((position) => {
//let latitude = position.coords.latitude
//    let longitude = position.coords.longitude;
//    let map = L.map('map').setView([latitude, longitude], 10);
//    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//        maxZoom: 19,
//        attribution: '&copy; <a href="http://www.openstreetmap.org///copyright">OpenStreetMap</a>'
//    }).addTo(map);
//    const marker = L.marker([latitude, longitude]).addTo(map);
//});



 //2. Posicionar el transporte público (trenes y autobuses) de Los Angeles en el mapa. 🎉 🚌 🚊

 //Tendrás que hacer:

//Fetch de la posición de los vehículos en tiempo real
//Después de hacer fetch(), tratar el objeto para poder pintar los puntos con Leafelt

let map = L.map('map').setView([34.05223, -118.24368], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


async function getVehiclesInfo() {
    let response = await fetch(
      "https://api.metro.net/LACMTA/vehicle_positions/all?geojson=false"
    );
    let data = await response.json();
    console.log(data);
    printBuses(data);
    
}
getVehiclesInfo();


function printBuses(buses){
    for (let i = 0; i < buses.length; i++) {
     
        let marker = L.marker([buses[i].position.latitude, buses[i].position.longitude]).addTo(map);
        marker.bindPopup(`<p>ID del vehiculo: ${buses[i].vehicle.vehicle_id}<p>`).openPopup();
      }
}


