import './css/style.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchBreedById } from './js/cat-api';

const selectCat = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
let breedId = [];
let storedBreed = [];

Notiflix.Loading.standard(`${loaderEl.textContent}`);
fetchBreeds()
  .then(response => {
    if (response.ok) {
      return response.json();
    }
  })

  .then(data => {
    allBreedSelect(data);
    Notiflix.Loading.remove();
    selectCat.classList.remove('hidden');
  })

  .catch(function (error) {
    console.log('erreo');
    errorEl.classList.remove('hidden');
    Notiflix.Report.failure(error);
  });

function allBreedSelect(data) {
  storedBreed = data;
  for (let i = 0; i < storedBreed.length; i++) {
    const breed = storedBreed[i];

    let option = document.createElement('option');

    option.value = breed.id;

    option.innerHTML = `${breed.name}`;
    selectCat.appendChild(option);
  }
}

const fetchCatByBreed = event => {
  document.getElementById('breed_image').classList.add('hidden');
  breedId = event.currentTarget.value;
  console.log(breedId);
  catInfo.classList.add('hidden');
  loaderShow();
  fetchBreedById(breedId)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(data => {
      getCatInfo(data);
      Notiflix.Loading.remove(500);
      loaderHidden();
      catInfo.classList.remove('hidden');

      document.getElementById('breed_image').classList.remove('hidden');
    })
    .catch(function (error) {
      errorEl.classList.remove('hidden');
      Notiflix.Report.failure(error);
    });
};

selectCat.addEventListener('change', fetchCatByBreed);

function getCatInfo(data) {
  const breedinfo = data[0].breeds[0];
  document.getElementById('breed_image').src = data[0].url;
  document.getElementById('breed_image').alt = breedinfo.id;
  document.querySelector('.cat-name').textContent = breedinfo.name;
  document.querySelector(
    '.cat-description'
  ).textContent = `Description: ${breedinfo.description}`;
  document.querySelector(
    '.cat-temperament'
  ).textContent = `Temperament: ${breedinfo.temperament}`;

  console.log(breedinfo.id);
}

function catBox() {
  const box = `<div class="cat_text_info">
<h2 class ="cat-name"></h2>
<p class = "cat-description"></p>
<ul class="temp_list">
<li class="cat-temperament"></li>
</ul>
</div>

<div>
<img id="breed_image" width="390"></img>
</div>`;
  catInfo.insertAdjacentHTML('afterbegin', box);
}

catBox();

function loaderHidden() {
  if (!loaderEl.classList.contains('hidden')) {
    loaderEl.classList.add('hidden');
  }
  return;
}

function loaderShow() {
  if (loaderEl.classList.contains('hidden')) {
    loaderEl.classList.remove('hidden');
  }
  return;
}
