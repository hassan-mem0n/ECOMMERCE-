// Locations: [title, lat, long, number/icon (you can use emojis if you're into that kind of stuff 👍)]
var locations = [
    ["Barking & Dagenham", 51.5453, 0.1337, "▪"],
    ["Barnet", 51.65, -0.2, "▪"],
    ["Bexley", 51.4333, 0.15, "▪"],
    ["Brent", 51.55, -0.2667, "▪"],
    ["Bromley", 51.4, 0.05, "▪"],
    ["Camden", 51.546, -0.1644, "▪"],
    ["City of London", 51.5084, -0.1255, "▪"],
    ["City of Westminster", 51.5, -0.1167, "▪"],
    ["Croydon", 51.3833, 0.01, "▪"],
    ["Ealing", 51.5, -0.3167, "▪"],
    ["Enfield", 51.6667, -0.0667, "▪"],
    ["Greenwich", 51.4779, -0.0118, "▪"],
    ["Hackney", 51.55, -0.05, "▪"],
    ["Hammersmith & Fulham", 51.5, -0.3167, "▪"],
    ["Haringey", 51.5833, -0.0833, "▪"],
    ["Harrow", 51.5833, -0.3167, "▪"],
    ["Havering", 51.6156, 0.1861, "▪"],
    ["Hillingdon", 51.5329, -0.4529, "▪"],
    ["Hounslow", 51.4667, -0.35, "▪"],
    ["Islington", 51.5362, -0.103, "▪"],
    ["Kensington & Chelsea", 51.4951, -0.2061, "▪"],
    ["Kingston upon Thames", 51.4167, -0.2833, "▪"],
    ["Lambeth", 51.5, -0.1167, "▪"],
    ["Lewisham", 51.45, -0.0167, "▪"],
    ["Merton", 51.413, -0.1982, "▪"],
    ["Newham", 51.8038, -2.4494, "▪"],
    ["Redbridge", 50.9167, -1.4667, "▪"],
    ["Richmond upon Thames", 51.4333, -0.2, "▪"],
    ["Southwark", 51.5, -0.0833, "▪"],
    ["Sutton", 51.35, -0.2138, "▪"],
    ["Tower Hamlets", 51.5, -0.0167, "▪"],
    ["Waltham Forest", 51.6, -0.0333, "▪"],
    ["Wandsworth", 51.45, -0.2, "▪"]
];

var gmarkers = [];
// Map Settings
var map = new google.maps.Map(document.getElementById("map-canvas"), {
    zoom: 9,
    center: new google.maps.LatLng(51.5000016, -0.1018987),
    mapTypeId: google.maps.MapTypeId.SATELITE,
    styles: [
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                {
                    lightness: 100
                },
                {
                    visibility: "simplified"
                }
            ]
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [
                {
                    visibility: "on"
                },
                {
                    color: "#C6E2FF"
                }
            ]
        },
        {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [
                {
                    color: "#C5E3BF"
                }
            ]
        },
        {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
                {
                    color: "#D1D1B8"
                }
            ]
        }
    ]
    //For more styles go to https://snazzymaps.com/
});

// Construct the circle for each value in citymap.
function initialize() {
    // Note: We scale the population by a factor of 20.
    for (var city in citymap) {
        var populationOptions = {
            strokeColor: "#fff",
            strokeOpacity: 0.2,
            strokeWeight: 10,
            fillColor: "#5080bc",
            fillOpacity: 0.3,
            map: map,
            center: citymap[city].center,
            radius: citymap[city].population / 20
        };
        // Add the circle for this city to the map.
        cityCircle = new google.maps.Circle(populationOptions);
    }
}

// First, create an object containing LatLng and population for each city.
var citymap = {};
// citymap["greatlondon"] = {
//     center: new google.maps.LatLng(51.5000016, -0.1018987),
//     population: 990000
// };
citymap["london"] = {
    center: new google.maps.LatLng(51.505, -0.1018987),
    population: 620000
};
// citymap["center"] = {
//     center: new google.maps.LatLng(51.5000016, -0.1018987),
//     population: 290000
// };
var cityCircle;
var infowindow = new google.maps.InfoWindow();
//Create markers
var marker, i;
for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        label: String(locations[i][3])
    });
    gmarkers.push(marker);
    google.maps.event.addListener(
        marker,
        "click",
        (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            };
        })(marker, i)
    );
}

//Enable clicking on the links to activate the corresponding marker
//For the map to work in IE11 the jQuery version needs to be used
//jQuery version:
$(".city-list a").each(function (i, e) {
    $(e).click(
        (function (i) {
            return function (e) {
                google.maps.event.trigger(gmarkers[i], "click");
            };
        })(i)
    );
});

//Vanilla JS version:
// const elements = document.querySelectorAll(".city-list a");
// Array.prototype.forEach.call(elements,(el, i)=>{
//     el.addEventListener("click", function(e){
//         google.maps.event.trigger(gmarkers[i], "click");
//         e.preventDefault();
//     })
// });

// Array.prototype.forEach.call(elements,(el, i)=>{
//     el.addEventListener("click",t=>{
//         t.preventDefault();
//         google.maps.event.trigger(gmarkers[i], "click");
//     })
// });

//Load the map
google.maps.event.addDomListener(window, "load", initialize);
//Make the map responsive by centering it on the viewport
google.maps.event.addDomListener(window, "resize", function () {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
});
