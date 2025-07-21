document.addEventListener('DOMContentLoaded', () => {
  const apiKey = 'c468419d6603441eb9245357252107';
  const button = document.getElementById('getWeatherBtn');
  const resultDiv = document.getElementById('result');

  button.addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();

    if (city === '') {
      resultDiv.innerHTML = '<span style="color: red;">Please enter a city name.</span>';
      return;
    }

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("City not found or API issue.");
        }
        return response.json();
      })
      .then(data => {
        const temperature = data.current.temp_c;
        const location = data.location.name;
        resultDiv.innerHTML = `The temperature in <strong>${location}</strong> is <strong>${temperature}°C</strong>.`;
      })
      .catch(error => {
        resultDiv.innerHTML = `<span style="color: red;">${error.message}</span>`;
      });
  });
});
