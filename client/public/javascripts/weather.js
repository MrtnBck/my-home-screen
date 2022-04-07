const weatherCard = document.getElementById('weather-card');

const cityName = 'Vienna';
const countryCode = 'AT';

//get location key from backend
const getCity = async (cityName, countryCode) => {
  try {
    //prettier-ignore
    const response = await axios.get(`http://localhost:8000/weather/location/${countryCode}/${cityName}`)
    const locationKey = response.data;
    //console.log(locationKey);
    getCurrentCondition(locationKey);
  } catch (err) {
    console.log(err);
  }
};

//get current weather condition from backend
const getCurrentCondition = async (locationKey) => {
  try {
    //prettier-ignore
    const response = await axios.get(`http://localhost:8000/weather/current/${locationKey}`);
    //console.log(response.data[0]);
    const currentWeather = response.data[0];
    //console.log(currentWeather);
    const description = currentWeather.WeatherText;
    const iconId = currentWeather.WeatherIcon;
    const isDayTime = currentWeather.IsDayTime;
    const temp = currentWeather.Temperature.Metric.Value;
    const precip = currentWeather.HasPrecipitation;
    createDashboard(description, iconId, isDayTime, temp, precip);
    //prettier-ignore
    setInterval(createDashboard,60000,description,iconId,isDayTime,temp,precip);
  } catch (err) {
    console.log(err);
  }
};

const createDashboard = (desc, iconId, isDayTime, temp, precip) => {
  const icon = getWeatherIcon(iconId);
  const dt = new Date();
  const month = dt.getMonth() + 1;
  const date = dt.getDate();
  const hour = dt.getHours();
  const min = dt.getMinutes();
  const cardHTML = `
    
    <div class="icon">
        ${icon}
      </div>
      <div class="box description">
        <span>${desc}</span>
      </div>
      <div class="temp-data">
        <span class="box" id="current-temp">${temp} C°</span>
        <span class="box ${precip ? '' : 'no-precip'}" id="current-prec"
          ><i class="fa-solid fa-umbrella"></i></span>
      </div>
      <div class="time">
        <span class="box" id="current time">${hour < 10 ? '0' + hour : hour}:${
    min < 10 ? '0' + min : min
  }</span>
        <span class="box" id="current date">${date < 10 ? '0' + date : date}.${
    month < 10 ? '0' + month : month
  }.</span>
      </div>
        
    `;
  weatherCard.innerHTML = cardHTML;
};

const getWeatherIcon = (id) => {
  //based on: https://developer.accuweather.com/weather-icons
  if (id === 1 || id === 2 || id === 4 || id === 5) {
    // Sun
    return '<i class="fa-solid fa-sun"></i>';
  } else if (id === 3) {
    // Sun + cloud
    return '<i class="fa-solid fa-cloud-sun"></i>';
  } else if (id === 6 || id === 7 || id === 8 || id === 11) {
    // Cloud
    return '<i class="fa-solid fa-cloud"></i>';
  } else if (
    id === 12 ||
    id === 13 ||
    id === 14 ||
    id === 15 ||
    id === 16 ||
    id === 17 ||
    id === 39 ||
    id === 40 ||
    id === 41 ||
    id === 42
  ) {
    // Shower
    return '<i class="fa-solid fa-cloud-showers-heavy"></i>';
  } else if (id === 18 || id === 19 || id === 20 || id === 21 || id === 43) {
    // Rain
    return '<i class="fa-solid fa-cloud-rain"></i>';
  } else if (id === 22 || id === 23 || id === 24 || id === 44) {
    // Snow
    return '<i class="fa-solid fa-snowflake"></i>';
  } else if (id === 25 || id === 26 || id === 29) {
    // Sleet, Snow+Rain
    return '<i class="fa-solid fa-braille"></i>';
  } else if (id === 30) {
    //Hot
    return '<i class="fa-solid fa-temperature-full"></i>';
  } else if (id === 31) {
    //Cold
    return '<i class="fa-solid fa-temperature-low"></i>';
  } else if (id === 32) {
    // Windy
    return '<i class="fa-solid fa-wind"></i>';
  } else if (id === 33 || id === 34 || id === 35 || id === 36 || id === 37) {
    //Night Clear
    return '<i class="fa-solid fa-moon"></i>';
  } else if (id === 38) {
    //Night Cloud
    return '<i class="fa-solid fa-cloud-moon"></i>';
  }
};

getCity(cityName, countryCode);
