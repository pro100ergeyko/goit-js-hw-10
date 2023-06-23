export { fetchBreeds, fetchBreedById };

const api_key =
  'live_qQ4JBHVPmmG5fyIMD6hXpghyupb1k6rn1yCCmRmiGQCTFMDt7Ws6FPjyT4WFfk8T';

function fetchBreeds() {
  const urlBreeds = `https://api.thecatapi.com/v1/breeds`;
  return fetch(urlBreeds, {
    headers: {
      'x-api-key': api_key,
    },
  });
}

function fetchBreedById(breedId) {
  const urlSearch = `https://api.thecatapi.com/v1/images/search?api_key=${api_key}&breed_ids=${breedId}`;

  return fetch(urlSearch, {
    headers: {
      'x-api-key': api_key,
    },
  });
}

function fetchData(END_POINT, options) {
  const response = fetch(`${BASE_URL}${END_POINT}`, options);
  const data = response.json();
  return data.results.slice(0, 3);
}

function fetchGenres(options) {
  const response = fetch(
    `https://api.themoviedb.org/3/genre/movie/list?language=en`,
    options
  );
  const data = response.json();
  return data.genres;
}

function onPageLoad() {
  fetchData(END_POINT, options).then(movieData => {
    renderMarkup(movieData).then(markup => {
      addMarkup(weeklyUlRef, markup);
    });
  });
}
