var load = function (url, onSuccess, onError){
	var xhr = new XMLHttpRequest();

	xhr.responseType = 'json';

	xhr.addEventListener('load', function (){
		if (xhr.status === 200) {
			onSuccess(xhr.response);
		} else {
			onError('Status javobi: '+xhr.status+' '+xhr.statusText);
		}
	});

	xhr.addEventListener('error', function (){
		onError('Ulanib bo\'lmadi');
	});

	xhr.addEventListener('timeout', function (){
		onError('So\'rov bajarilmadi'+xhr.timeout+'ms');
	});

	xhr.timeout = 10000;
	xhr.open('GET', url); // Form method'ining GET imi ?
	xhr.send();// Nima un bo'sh ?
};
// document'dan element'larni tanlab olish
var elNavForm = document.querySelector('.nav-form');
var elSearchInput = document.querySelector('.search-input');
var elTypeSelect = document.querySelector('type-input');
var elYearInput = document.querySelector('.year-input');
var elSearchButton = document.querySelector('.send-btn');
var elResults = document.querySelector('.list-movie');

elResults.addEventListener('click', function (evt){
	if (evt.target.matches('.more-info-btn')){

			var url = 'http://www.omdbapi.com/?apikey=f081254&i='+evt.target.dataset.imdbId;
			console.log(url);

		}
});

var showMovies = function (movies){
	elResults.innerHTML = '';
	movies.forEach(function (movie){
		elResults.innerHTML += '<li>'+movie.Title+' <button class="more-info-btn btn btn-outline-secondary mt-sm-2" type="button"  data-imdb-id="'+movie.imdbID+'">More info</button>';


		// More info button bosilganda
		// var poster = document.createElement('img');
		// poster.src = movie.Poster;
		// document.querySelector('.info').innetHTML = '';
		// document.querySelector('.info').appendChild(poster);
	});
};

var onLoadSuccess = function (response){
	showMovies(response.Search);
};
var onLoadError = function (error){
	console.log(error);
};
var onSearchFormSubmit = function (evt){
	evt.preventDefault();
	var url = 'http://www.omdbapi.com/?apikey=f081254&s='+elSearchInput.value;
	load(url, onLoadSuccess, onLoadError);
};
elNavForm.addEventListener('submit', onSearchFormSubmit);


// ajax
// asinxron so'rov bn ishlash
// rasm yo bosa if ga olw kk