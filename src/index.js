import './css/styles.css';
import fetchCountries from './fetchCountries.js';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('input#search-box');
const listRef = document.querySelector('.country-list');
const infoRef = document.querySelector('.country-info');

let searchQuery = "";

inputRef.addEventListener('input', debounce(inputFetch, DEBOUNCE_DELAY));

function inputFetch(searchQuery) {
  searchQuery = inputRef.value.trim();
  if (!searchQuery) {
    return;
  }
  fetchCountries(searchQuery).then(renderMarkup).catch(errorRender);
}

function renderMarkup(countries) {
  reserMarkup();
  if ((countries.length === 0)) {
   errorRender();
  } else if (countries.length > 1 && countries.length < 10) {
    appendListMarkup(countries);
  } else if (countries.length > 10){
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
  else {
      appendInfoMarkup(countries);
  }
}

function appendInfoMarkup(countries) {
    const infoMarkup = countries.map(({ name: { official }, flags: {svg}, capital, population, languages }) => {
      const language = Object.values(languages)
      .join(", ");
    return `
      <h1><img width=40 height=20 src="${svg}"/><span>${official}</span></h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${language}</p>`}).join('');
  
    listRef.innerHTML = infoMarkup;
    
};

function appendListMarkup(countries) {
     const listMarkup =  countries.map(({ name: { official }, flags: {svg}} ) => {
        return `
        <li class="country-list__item">
        <img width=40 height=20 src ="${svg}"/></span>${official}</span></li>`}).join('')
        
        listRef.innerHTML = listMarkup;
      
}
function errorRender() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
function reserMarkup() {
  listRef.innerHTML = "";
  infoRef.innerHTML = "";
}