const apikey ="2aa62ee7b0ae4a50fdc4b12cc3bb7dbf";

const weatherDataE1 = document.getElementById("weather-data");

const cityInputE1 = document.getElementById("city-input");



const forme1 = document.querySelector("form");

forme1.addEventListener("submit", (event)=>{
    event.preventDefault();
    const cityValue = cityInputE1.value;
    getWeatherData(cityValue);
} );

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

        if(!response.ok){
            throw new Error("Network reponse was not okay")
        }

        const data = await response.json()
   const temperature = Math.round(data.main.temp);
   const description = data.weather[0].description;
   const icon = data.weather[0].icon;

   const details = [
    `Feels like: ${Math.round(data.main.feels_like)}`,
    `Humadity: ${data.main.humidity} %`,
    `Wind Speed: ${data.wind.speed} m/s`,
    ]

    
    weatherDataE1.querySelector(".icon").innerHTML = `<img
    src="http://openweathermap.org/img/wn/${icon}.png"
    alt="Weather Icon"
  />`;

  weatherDataE1.querySelector(".temperature").textContent = `${temperature} °C`;
  weatherDataE1.querySelector(".description").textContent = `${description}`;

  weatherDataE1.querySelector(".details").innerHTML = details.map((detail)=> `<div>${detail}</div>`).join("");
    } catch (error) {
        weatherDataE1.querySelector(".icon").innerHTML = "";
    
      weatherDataE1.querySelector(".temperature").textContent = "";
      weatherDataE1.querySelector(".description").textContent = "An Error Occur, Please check spelling :(";
    
      weatherDataE1.querySelector(".details").innerHTML = "";
    }
}