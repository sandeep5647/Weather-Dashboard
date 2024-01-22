document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('searchBtn').addEventListener('click', function () {
      
      var cityName = document.querySelector('.input-box').value;

      getWeatherData(cityName);
  });

  document.querySelector('.input-box').addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
          var cityName = document.querySelector('.input-box').value;
          getWeatherData(cityName);
      }
  });
});

function getWeatherData(cityName) {

  var apiKey = "9b497f5a811dc92ff9671855f4acdb8d";
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(apiUrl)
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {          
          if (data.cod && data.cod !== '404') {
              updateWeatherInfo(data);  
              updateImage(data);
              console.log(data);
          } else {
              alert('City not found. Please enter a valid city name.');
          }
      })
      .catch(function (error) {
          console.log('Error fetching weather data:', error);
      });
}

  function updateWeatherInfo(weatherData) {

    document.querySelector('.temperature').innerHTML = Math.round(weatherData.main.temp - 273.15) +`°C`;

    document.querySelector('.feels_like').innerHTML = Math.round(weatherData.main.feels_like - 273.15) +`°C`;
  
    document.querySelector('.description').innerHTML = weatherData.weather[0].main;
  
    document.querySelector('.city-name').innerHTML = weatherData.name;

    document.querySelector('.country').innerHTML = weatherData.sys.country;

    document.querySelector('.wind-speed').innerHTML = weatherData.wind.speed + ' kmph';   
 
    document.querySelector('.pressure').innerHTML = weatherData.main.pressure + ' hPa';

    document.querySelector('.humidity').innerHTML = weatherData.main.humidity + ' %';
  }

  function updateImage(weatherData) {
  var weather_img = document.querySelector('.weather_icon');
  var condition = weatherData.weather[0].main;
  
  switch (condition) {
    case 'Clouds':
        weather_img.src = "./image/cloud.png";
        break;
    case 'Rain':
        weather_img.src = "./image/rain.png";
        break;
    case 'Mist':
        weather_img.src = "./image/mist.png";
        break;
    case 'Snow':
        weather_img.src = "./image/snow.png";
        break;
    case 'Smoke':
        weather_img.src = "./image/smoke.png";
        break;
    default:
        weather_img.src = "./image/clear.png";  
  }
}
