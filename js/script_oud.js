function data(){
	fetch('https://randomuser.me/api?results=10')
  	.then(function(response) {
    return response.json();
	})
  .then(function(myJson) {
    // console.log(JSON.stringify(myJson));
    localStorage.setItem('testObject', JSON.stringify(myJson));
    	
	});
};

//Laden
data();

//Nieuw profiel tonen
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
};
nextProfile();


let likes = new Array();
let dislikes = new Array();

//LIKE
function like(){
	likes.push(active.name.first + ' ' + active.name.last);
	console.log('You like: ' + likes);
	localStorage.setItem('LIKES', JSON.stringify(likes));
	nextProfile();	
}
//DISLIKE
function dislike(){
	dislikes.push(active.name.first + ' ' + active.name.last);
	console.log('You dislike: ' + dislikes);
	localStorage.setItem('DISLIKE', JSON.stringify(dislikes));
	nextProfile();	
};

//SEE LIKES
function seeLikes(){
	document.getElementById('likeList').innerHTML = '';
	for (let i = 0; i < likes.length; i++) {
		document.getElementById('likeList').innerHTML += '<li class="like">' + likes[i] + '</li>';
	};
};

//SEE DISLIKES
function seeDislikes(){
	document.getElementById('dislikelist').innerHTML = '';
	for (let i = 0; i < dislikes.length; i++) {
		document.getElementById('dislikelist').innerHTML += '<li class="dislike">' + dislikes[i] + '</li>';
	};
};

// LIKE NAAR DISLIKE
for (let i = 0; i < likes.length; i++) {
		let liLikes = document.querySelectorAll('.like');
		liLikes[i].addEventListener("click", function(){
		localStorage.setItem('DISLIKE', JSON.stringify(dislikes));
		dislikes.push[i];
		likes.splice(i, 1);
		seeLikes();
		seeDislikes();
	})
};

// DISLIKE NAAR LIKE
for (let i = 0; i < dislikes.length; i++) {
		let liDislikes = document.querySelectorAll('.dislike');
		liDislikes[i].addEventListener("click", function(){
		localStorage.setItem('likes', JSON.stringify(likes));
		likes.push[i];
		dislikes.splice(i, 1);
		seeLikes();
			seeDislikes();
	})
};


// KLOPT_NIEUW
// function data(){
// 	fetch('https://randomuser.me/api?results=10')
//   	.then(function(response) {
//     return response.json();
// 	})
//   .then(function(myJson) {
//     // console.log(JSON.stringify(myJson));
//     localStorage.setItem('testObject', JSON.stringify(myJson));
    	
// 	});
// };

// //Laden
// data();

// //Nieuw profiel tonen
// let nul=0;
// let active = '';
// function nextProfile(){

//     let newPerson = JSON.parse(localStorage.getItem('testObject'));
//     active = newPerson.results[nul];
//     showProfile(active);
//     console.log(active.name);
//     console.log(nul);
//     if(nul>=9){
//         nul=0;
//         data();
//     }else{
//         nul++;
//     }
// };

// function showProfile(gegevens){
// let img = document.createElement('img');
// img.src = gegevens.picture.large;
// document.getElementById('div').innerHTML = '<img src="' + gegevens.picture.large + '" >';

// let showFName = gegevens.name.first;
// let showLName = gegevens.name.last;
// let fullName = showFName + ' ' + showLName;
// document.getElementById('name').innerHTML = showFName + ' ' + showLName;

// let showAge = gegevens.dob.age;
// document.getElementById('age').innerHTML = 'Age: ' + showAge;

// let showLocation = gegevens.location.city;
// document.getElementById('place').innerHTML = showLocation;
// };
// nextProfile();


// let likes = new Array();
// let dislikes = new Array();

// // LIKE
// function like(){
// 	likes.push(active.name.first + ' ' + active.name.last);
// 	console.log('You like: ' + likes);
// 	localStorage.setItem('LIKES', JSON.stringify(likes));
// 	nextProfile();
//     seeLikes();
// };
// //DISLIKE
// function dislike(){
// 	dislikes.push(active.name.first + ' ' + active.name.last);
// 	console.log('You dislike: ' + dislikes);
// 	localStorage.setItem('DISLIKE', JSON.stringify(dislikes));
// 	nextProfile();
//     seeDislikes();
// };

// // seeLikes
// function seeLikes(){
//     document.getElementById('likeList').innerHTML = "";
//     for (let i = 0; i < likes.length; i++) {
//         document.getElementById('likeList').innerHTML += "<li class='li_likes'>" + likes[i] + "</li>";
//     }
// };

// // seeDislikes
// function seeDislikes(){
//     document.getElementById('dislikeList').innerHTML = "";
//     for (let i = 0; i < dislikes.length; i++) {
//         document.getElementById('dislikeList').innerHTML += "<li class= 'li_dislikes'>" + dislikes[i] + "</li>";
//     }
// };

// // Like to dislike
// for (let i = 0; i < likes.length; i++) {
//         let liLikes = document.querySelectorAll('.like');
//         liLikes[i].addEventListener("click", function(){
//         localStorage.setItem('DISLIKE', JSON.stringify(dislikes));
//         dislikes.push[i];
//         likes.splice(i, 1);
//         seeLikes();
//         seeDislikes();
//     })
// };










































