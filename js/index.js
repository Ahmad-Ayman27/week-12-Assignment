let locationInput = document.getElementById("locationInput");
let fetchResp = [];

let mainButton = document.getElementById("mainButton");
mainButton.addEventListener("click", async function () {
    let inputValue = locationInput.value.trim();

    if (!inputValue || !/^[a-zA-Z\s-]+$/.test(inputValue)) {
        alert("Please enter a valid city name");
        locationInput.classList.add("is-invalid");
    } else {
        locationInput.classList.remove("is-invalid");
        await fetchWeatherData(inputValue);
        locationInput.value = ""; 
    }
});

async function fetchWeatherData(city) {
    try {
        let weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2e4b820fe44c4641b3c81559241312&q=${city}&days=3`);
        if (!weather.ok) {
            throw new Error("Invalid city name or API error.");
        }
        fetchResp = await weather.json();
        displayWeatherCond();
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Please Enter valid city");
    }
}

function displayWeatherCond() {
    if (fetchResp.forecast && fetchResp.forecast.forecastday) {
        let cartona = "";
        fetchResp.forecast.forecastday.forEach(day => {
          
            let formattedDate = new Date(day.date).toLocaleDateString('en-US', {
                weekday: 'long',
                day: 'numeric', 
                month: 'long'    
            });

            let iconUrl = `https:${day.day.condition.icon}`;
            cartona += `
                <div class="col-md-4">
                    <div class="card w-25 mb-5 card1">
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <p class="m-0">${formattedDate}</p>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${fetchResp.location.name}</h5>
                            <p class="card-text celisius">${day.day.avgtemp_c} °C</p>
                            <img src="${iconUrl}" alt="${day.day.condition.text}">
                            <p class="text-info">${day.day.condition.text}</p>
                            <div class="card1-imgs d-flex align-items-center justify-content-start">
                                <div class="umbrella d-flex align-items-center justify-content-center">
                                    <img src="images12/images124.png" class="w-30" alt="umbrella">
                                    <p class="mt-3 ms-1">${day.day.daily_chance_of_rain}%</p>
                                </div>
                                <div class="wind d-flex align-items-center justify-content-center">
                                    <img src="images12/images125.png" class="w-30" alt="wind">
                                    <p class="mt-3 ms-1">${day.day.maxwind_kph} km/h</p>
                                </div>
                                <div class="compass d-flex align-items-center justify-content-center">
                                    <img src="images12/images126.png" class="w-30" alt="wind">
                                    <p class="mt-3 ms-1">${day.day.wind_dir}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card w-25 mb-5 card2">
                        <div class="card-header text-center">Tuesday</div>
                        <div class="card-body text-center mt-4">
                            <h5 class="card-title text-center"><img src="images12/images127.png" alt=""></h5>
                            <p class="card-text text-center p-0 m-0 lh-base fs-2 fw-medium">${day.day.maxtemp_c}</p>
                            <span>${day.day.mintemp_c}</span>
                            <p class="text-info mt-4">${day.day.condition.text}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card w-25 mb-5 card3">
                        <div class="card-header text-center">Wednesday</div>
                        <div class="card-body text-center mt-4">
                            <h5 class="card-title text-center"><img src="images12/images127.png" alt=""></h5>
                            <p class="card-text text-center p-0 m-0 lh-base fs-2 fw-medium">${day.day.maxtemp_c}</p>
                            <span>${day.day.mintemp_c}</span>
                            <p class="text-info mt-4">${day.day.condition.text}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        document.getElementById("weatherInfo").innerHTML = cartona;
    } else {
        console.error("No forecast data available.");
    }
}
fetchWeatherData("Cairo");

