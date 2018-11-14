function data(){
    fetch('https://randomuser.me/api?results=10')
    .then(function(response) {
    return response.json();
    })
  .then(function(myJson) {
    localStorage.setItem('testObject', JSON.stringify(myJson));
        
    });
};

//Laden
data();

//Nieuw profiel laden
let nul=0;
let active = '';
function nextProfile(){
    let newPerson = JSON.parse(localStorage.getItem('testObject'));
    active = newPerson.results[nul];
    showProfile(active);
    console.log(active.name);
    console.log(nul);
    if(nul>=9){
        nul=0;
        data();
    }else{
        nul++;
    }
};

// NIEUW PROFIEL TONEN
function showProfile(gegevens){
let img = document.createElement('img');
img.src = gegevens.picture.large;
document.getElementById('div').innerHTML = '<img src="' + gegevens.picture.large + '" >';

let showFName = gegevens.name.first;
let showLName = gegevens.name.last;
let fullName = showFName + ' ' + showLName;
document.getElementById('name').innerHTML = showFName + ' ' + showLName;

let showAge = gegevens.dob.age;
document.getElementById('age').innerHTML = 'Age: ' + showAge;

let showLocation = gegevens.location.city;
document.getElementById('place').innerHTML = showLocation;

let lat2 = gegevens.location.coordinates.latitude;
let lon2 = gegevens.location.coordinates.longitude;
let latlon = lat2 + "," + lon2;
localStorage.setItem('lon2', lon2);
localStorage.setItem('lat2', lat2);
getDistanceFromLatLonInKm();
mapbox();
};

nextProfile();

let likes = new Array();
let dislikes = new Array();


// LIKE
function like(){
    likes.push(active.name.first + ' ' + active.name.last);
    console.log('You like: ' + likes);
    localStorage.setItem('LIKES', JSON.stringify(likes));
    nextProfile();
    seeLikes();
};
//DISLIKE
function dislike(){
    dislikes.push(active.name.first + ' ' + active.name.last);
    console.log('You dislike: ' + dislikes);
    localStorage.setItem('DISLIKE', JSON.stringify(dislikes));
    nextProfile();
    seeDislikes();
};

// seeLikes
function seeLikes(){
    document.getElementById('likeList').innerHTML = "";
    for (let i = 0; i < likes.length; i++) {
        document.getElementById('likeList').innerHTML += "<li class='li_likes' id='" + i + "'>" + likes[i] + "</li>";
    }
    renderEvtListeners();
};

// seeDislikes
function seeDislikes(){
    document.getElementById('dislikeList').innerHTML = "";
    for (let i = 0; i < dislikes.length; i++) {
        document.getElementById('dislikeList').innerHTML += "<li class='li_dislikes' id='" + i + "'>" + dislikes[i] + "</li>";
    }
    renderEvtListeners();
};

//Like to dislike
function renderEvtListeners(){
    let li_likes = document.getElementsByClassName("li_likes");
    for (let i = 0; i < li_likes.length; i++) {
        li_likes[i].addEventListener("click", toDislike);
    }

    let li_dislikes = document.getElementsByClassName("li_dislikes");
    for (let i = 0; i < li_dislikes.length; i++) {
        li_dislikes[i].addEventListener("click", toLike);
    }
}

function toDislike(e){
    console.log('LIKEDEBUG: ' + e.currentTarget.id);
    dislikes.push(likes[e.currentTarget.id]);
    likes.splice(e.currentTarget.id, 1);
    seeDislikes();
    seeLikes();
}

function toLike(e){
    console.log('DISLIKEDEBUG: ' + e.currentTarget.id);
    likes.push(dislikes[e.currentTarget.id]);
    dislikes.splice(e.currentTarget.id, 1);
    seeDislikes();
    seeLikes();
}

// OWN GEO
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
};
function showPosition(position) {
    let lat1 = position.coords.latitude;
    let lon1 = position.coords.longitude;
    localStorage.setItem('lon1', lon1);
    localStorage.setItem('lat1', lat1);
    console.log("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude); 
};
getLocation();

// DISTANCE FROM A TO B
function getDistanceFromLatLonInKm() {
    let lon1 = localStorage.getItem("lon1"); //EIGEN
    let lat1 = localStorage.getItem("lat1");
    let lon2 = localStorage.getItem("lon2"); //CLIENT
    let lat2 = localStorage.getItem("lat2");
    console.log(lon1 + " " + lon2 + " " + " " + lat1 + " " + lat2);
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2-lat1);  // deg2rad below
    let dLon = deg2rad(lon2-lon1); 
    let a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  let d = R * c; // Distance in km
  let d_limit = d.toFixed(0);
  document.getElementById('away_from_you').innerHTML = d_limit + "km away from you."
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

// MAPBOX
function mapbox(){
    let lon2 = localStorage.getItem("lon2"); //CLIENT
    let lat2 = localStorage.getItem("lat2");

    mapboxgl.accessToken = 'pk.eyJ1Ijoib2xpdmllcjk5IiwiYSI6ImNqbzQwNGZpZDB6aGczcG54ejJqMzJwanUifQ.61405ZGUrwHGh7IYEy0IFQ';
        
        let map = new mapboxgl.Map({
        container: 'mapje', // container id
        style: 'mapbox://styles/mapbox/basic-v9', //hosted style id
        center: [lon2, lat2], // starting position
        zoom: 5 // starting zoom
    });
}

//SWIPE
let container = document.getElementById("div");
let hammer = new Hammer(container);

hammer.on('swipeleft', function(ev){
    like();
});

hammer.on('swiperight', function(ev){
    dislike();
});