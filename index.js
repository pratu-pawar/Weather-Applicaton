const timeE1 = document.getElementById('time');
const dateE1 =document.getElementById('date')
const currentWeatherItemsE1 = document.getElementById('current-Weather-items');
const timeZone = document.getElementById('time-zone');
const countryE1 = document.getElementById('country');
const weatherForecastE1 = document.getElementById('weather-forecast');
const currentTempE1 = document.getElementById('current-temp');


const days = ['sunday', 'monday', 'tuseday', 'wednesday', 'thursday', 'friday', 'saturday']
const months = ['jan', 'feb','mar', 'apr', 'may', 'jun','jul', 'aug', 'sep', 'oct','nov', 'dec'];

const API_KEY = 'bfcd5ecd0349873a53a64cae81977a44';

setInterval(()=>{ 
    const time = new Date();
    const month = time.getMonth();
    const date = date.getDate();
    const day = day .getDay();
    const hour = hour.getHours();
    const hoursIn12HrFormate = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ?'PM' : "AM"

    timeE1.innerHTML = (hoursIn12HrFormate < 10? '0'+ hoursIn12HrFormate: hoursIn12HrFormate) + ':'
     + (minutes < 10? '0' +minutes: minutes) + ` `+
    `<span id="am-pm">${ampm}</span>`

    dateE1.innerHTML = days[day] + ',' + date + months[month]


}, 1000)

getWeatherData()
function getWeatherData(){ 
    navigator.geolocation.getCurrentPosition((success) => { 
        
        let {latitude, longitude} = success.coords
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat= 
        ${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(res=> res.json()).then(data =>{ 

            console.log(data);
            showWeatherData(data);
        })

})

}

     function showWeatherData(data){ 
        let {humidity, pressure, sunrise, sunset, wind_speed}=data.current;

        timeZone.innerHTML = data.timeZone;
        countryE1.innerHTML = data.let + 'N' + data.lon + 'E'
 

        `<div class="weather-item"> 
           <div>Humidity</div>
           <div>${humidity}</div>
      </div>

      <div class="weather-item"> 
          <div>Pressure</div>
          <div>${pressure}</div>
      </div>

      <div class="weather-item"> 
          <div> Wind speed</div>
          <div>${wind_speed}</div>
      </div>

         <div class="weather-item"> 
           <div>Sunrise</div>
           <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
      </div>

        <div class="weather-item"> 
          <div>sunset</div>
          <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
      </div>`

      ;


      let otherDayForcast = ''
      data.daily.forEach((day, idx)=>{ 
        if(idx == 0){ 

            currentTempE1.innerHTML= 
            `<img
            src="https://th.bing.com/th/id/OIP.4Q-f_qDXxkjr7zK8vNw8rgAAAA?pid=Img${day.weather[0].icon}&w=100&h=100&c=7&dpr=1.5"
            alt="weather icon"
            class="w-icon"/>
            <div class="day">${window.moment(sunrise * 1000).format('ddd')}</div>
          <div class="temp">Night -  ${day.temp.night}#176; C</div>
          <div class="temp">Day -  ${day.temp.day}#176; C</div> `

        }else{
            otherDayForcast +=
            `<div class="weather-forecast-item">
          <div class="day">${window.moment(sunrise * 1000).format('ddd')}</div>
          <img
            src="https://th.bing.com/th/id/OIP.4Q-f_qDXxkjr7zK8vNw8rgAAAA?pid=Img${day.weather[0].icon}&w=100&h=100&c=7&dpr=1.5"
            alt="weather icon"
            class="w-icon"
          />
          <div class="temp">Night - ${day.temp.night}#176; C</div>
          <div class="temp">Day - ${day.temp.day}&#176; C</div>
        </div> `

        }
      })

      
      weatherForecastE1.innerHTML = otherDayForcast;
      


     }



