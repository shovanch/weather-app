const key = 'eddb9c8514a8cfd0d2abf61e4df288ac';
const weatherBox = document.getElementsByClassName('weather-box')[0];
const tempBox = document.getElementsByClassName('weather-box__temp')[0];

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getWeatherInfo);
} else {
  weatherBox.innerHTML = 'Sorry Position not found.';
}

function getWeatherInfo (position) {
  console.log('Request Sent');
  console.log(position);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${key}`;

  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      console.log(data);
      const location = document.createElement('h1');
      location.setAttribute('class', 'weather-box__location');
      location.textContent = data.name;

      const desc = document.createElement('h2');
      desc.setAttribute('class', 'weather-box__description');
      desc.textContent = data.weather[0].main;

      const tempNum = document.createElement('span');
      tempNum.setAttribute('class', 'weather-box__temp-num');
      tempNum.textContent = data.main.temp;

      const tempIcon = document.createElement('i');
      tempIcon.setAttribute('class', 'weather-box__temp-icon wi wi-celsius');

      let prefix = 'wi wi-';
      const code = data.weather[0].id;
      let icon = weatherIcons[code].icon;

      // If we are in the range of the icon class IDs, add day/night depending on time
      let time = '';
      if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
        const today = new Date();
        const hour = today.getHours();

        console.log(hour);

        if (hour > 6 && hour < 18) {
          // Day time
          time = 'day-';
        } else {
          // Night time
          time = 'night-';
        }
      }
      console.log(time);

      // Finally tack on the prefix + time-of-day + weaherID
      icon = prefix + time + icon;
      console.log(icon);

      const icons = document.createElement('i');
      icons.setAttribute('class', 'weather-box__icon');
      icons.setAttribute('class', `weather-box__icon ${icon} `);

      weatherBox.appendChild(location);
      weatherBox.appendChild(icons);
      weatherBox.appendChild(desc);

      tempBox.appendChild(tempNum);
      tempBox.appendChild(tempIcon);
    }
  };
  request.send();
}
