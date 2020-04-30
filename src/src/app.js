import Globe from 'globe.gl';
import { request, getCoordinates, numberWithCommas, formatDate } from './utils';
import {
  GLOBE_IMAGE_URL,
  BACKGROUND_IMAGE_URL,
  GEOJSON_URL,
  CASES_API,
} from './constants';
import * as d3 from 'd3';

// Globe container
const globeContainer = document.getElementById('globeViz');

const colorScale = d3.scaleSequentialPow(d3.interpolateYlOrRd).exponent(1 / 4);
const getVal = (feat) => {
  return feat.covidData.confirmed / feat.properties.POP_EST;
};

let world;

const flagEndpoint = 'https://corona.lmao.ninja/assets/img/flags';

init();

function init() {
  world = Globe()(globeContainer)
    .globeImageUrl(GLOBE_IMAGE_URL)
    .backgroundImageUrl(BACKGROUND_IMAGE_URL)
    .showGraticules(false)
    .polygonAltitude(0.06)
    .polygonCapColor((feat) => colorScale(getVal(feat)))
    .polygonSideColor(() => 'rgba(0, 100, 0, 0.05)')
    .polygonStrokeColor(() => '#111')
    .polygonLabel(
      ({ properties: d, covidData: c }) => `
            <div class="card">
              <img class="card-img" src="${flagEndpoint}/${d.ISO_A2.toLowerCase()}.png" alt="flag" />
              <div class="container">
                 <span class="card-title"><b>${d.NAME}</b></span> <br />
                 <div class="card-spacer"></div>
                 <hr />
                 <div class="card-spacer"></div>
                 <span>Cases: ${numberWithCommas(c.confirmed)}</span>  <br />
                 <span>Deaths: ${numberWithCommas(c.deaths)}</span> <br />
                 <span>Recovered: ${numberWithCommas(
                   c.recoveries
                 )}</span> <br />
                 <span>Population: ${d3.format('.3s')(d.POP_EST)}</span>
              </div>
            </div>
          `
    )
    .onPolygonHover((hoverD) =>
      world
        .polygonAltitude((d) => (d === hoverD ? 0.12 : 0.06))
        .polygonCapColor((d) =>
          d === hoverD ? 'steelblue' : colorScale(getVal(d))
        )
    )
    .polygonsTransitionDuration(200);
    world.controls().autoRotate = false;
    world.controls().autoRotateSpeed = 0.1;

  getCases();
}

let dates = [];
let countries = [];
let featureCollection = [];

// Play button
const playButton = document.querySelector('.play-button');
// Slider
const slider = document.querySelector('.slider');
// Slider date
const sliderDate = document.querySelector('.slider-date');

async function getCases() {
  countries = await request(CASES_API);
  featureCollection = (await request(GEOJSON_URL)).features;

  // world.polygonsData(countriesWithCovid);
  document.querySelector('.title-desc').innerHTML =
    'Hover on a country or territory to see cases, deaths, and recoveries.';

  dates = Object.keys(countries.China);

  // Set slider values
  slider.max = dates.length - 1;
  slider.value = dates.length - 1;

  slider.disabled = false;
  playButton.disabled = false;

  updateCounters();
  updatePolygonsData();

  updatePointOfView();
}

const infectedEl = document.querySelector('#infected');
const deathsEl = document.querySelector('#deaths');
const recoveriesEl = document.querySelector('#recovered');
const updatedEl = document.querySelector('.updated');

function updateCounters() {
  sliderDate.innerHTML = dates[slider.value];

  let totalConfirmed = 0;
  let totalDeaths = 0;
  let totalRecoveries = 0;

  Object.keys(countries).forEach((item) => {
    if (countries[item][dates[slider.value]]) {
      const countryDate = countries[item][dates[slider.value]];
      totalConfirmed += +countryDate.confirmed;
      totalDeaths += +countryDate.deaths;
      totalRecoveries += countryDate.recoveries ? +countryDate.recoveries : 0;
    }
  });

  infectedEl.innerHTML = numberWithCommas(totalConfirmed);
  deathsEl.innerHTML = numberWithCommas(totalDeaths);
  recoveriesEl.innerHTML = numberWithCommas(totalRecoveries);

  updatedEl.innerHTML = `(as of ${formatDate(dates[slider.value])})`;
}

function updatePolygonsData() {
  for (let x = 0; x < featureCollection.length; x++) {
    const country = featureCollection[x].properties.NAME;
    if (countries[country]) {
      featureCollection[x].covidData = {
        confirmed: countries[country][dates[slider.value]].confirmed,
        deaths: countries[country][dates[slider.value]].deaths,
        recoveries: countries[country][dates[slider.value]].recoveries,
      };
    } else {
      featureCollection[x].covidData = {
        confirmed: 0,
        deaths: 0,
        recoveries: 0,
      };
    }
  }

  const maxVal = Math.max(...featureCollection.map(getVal));
  colorScale.domain([0, maxVal]);
  world.polygonsData(featureCollection);
}

async function updatePointOfView() {
  // Get coordinates
  try {
    const { latitude, longitude } = await getCoordinates();

    world.pointOfView(
      {
        lat: latitude,
        lng: longitude,
      },
      1000
    );
  } catch (e) {
    console.log('Unable to set point of view.');
  }
}

let interval;

playButton.addEventListener('click', () => {
  if (playButton.innerText === 'Play') {
    world.controls().autoRotate = true;
    playButton.innerText = 'Pause';
  } else {
    playButton.innerText = 'Play';
    world.controls().autoRotate = false;
    clearInterval(interval);
    return;
  }

  // Check if slider position is max
  if (+slider.value === dates.length - 1) {
    slider.value = 0;
  }

  sliderDate.innerHTML = dates[slider.value];

  interval = setInterval(() => {
    slider.value++;
    sliderDate.innerHTML = dates[slider.value];
    updateCounters();
    updatePolygonsData();
    if (+slider.value === dates.length - 1) {
      playButton.innerHTML = 'Play';
      world.controls().autoRotate = false;
      clearInterval(interval);
    }
  }, 200);
});

if ('oninput' in slider) {
  slider.addEventListener(
    'input',
    function () {
      updateCounters();
      updatePolygonsData();
    },
    false
  );
}

// Responsive globe
window.addEventListener('resize', (event) => {
  world.width([event.target.innerWidth]);
  world.height([event.target.innerHeight]);
});
