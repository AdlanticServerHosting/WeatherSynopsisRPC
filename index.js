const client = require('discord-rich-presence')('1005810805880664146');

const wsty = true // for wind direction style | false - compass / true - emoji
const lat = 33.4774978 // lattitude
const lon = -84.4760475 // longitude
let apikey = "fe2b40e10e456b3ea6dfae2c4e0348b5" // get api key from openweathermap.org

const axios = require('axios');

function layout1(ms) {
     axios
  .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`)
  .then(res => {
    
    if(res.status == 200) {
        function wind() {
            const wind = res.data.wind.deg
            if (wind == 0) {
                if (wsty) {
                  return "⬆"
                } else {
                  return "N"
                }
                
            } else if (wind > 0 | wind < 90) {
                if (wsty) {
                  return "↗"
                } else {
                  return "NE"  
                }
                
            } else if (wind == 90) {
                if (wsty) {
                  return "➡"
                } else {
                  return "E"  
                }
                
            } else if (wind > 90 | wind < 180) {
                if (wsty) {
                  return "↘"
                } else {
                  return "SE"  
                }
                
            } else if (wind == 180) {
                if (wsty) {
                  return "⬇"
                } else {
                  return "S"  
                }
                
            } else if (wind > 180 | wind < 270) {
                if (wsty) {
                  return "↙"
                } else {
                  return "SW"  
                }
                
            } else if (wind == 270) {
                if (wsty) {
                  return "⬅"
                } else {
                  return "W"  
                }
                
            } else if (wind > 270 | wind < 360) {
                if (wsty) {
                  return "↖"
                } else {
                  return "NW"  
                }
                
            }
        }
        const temp = res.data.main.temp - 273.15 ^ 9/5 + 32
        client.updatePresence({
            state: temp + "°F | " + wind() + " " + res.data.wind.speed + " MPH",
            details: 'Weather Synopsis for ' + res.data.name,
            startTimestamp: Date.now(),
            endTimestamp: Date.now() + ms,
            largeImageKey: 'watermark',
            smallImageKey: 'verified',
            instance: true,
        });
        console.log("Updated your precense to layout 1")
    } else {
        console.error("There was an error getting the weather. Did you follow the steps?")
    }
    
    
  })
  .catch(error => {
    console.error(error);
  });
}

function layout2(ms) {
    axios
 .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`)
 .then(res => {
   
   if(res.status == 200) {
    
      client.updatePresence({
           state: "☁ - " + res.data.clouds.all + " | 📡 - " + res.data.base,
           details: 'Weather Synopsis for ' + res.data.name,
           startTimestamp: Date.now(),
           endTimestamp: Date.now() + ms,
           largeImageKey: 'watermark',
           smallImageKey: 'verified',
           instance: true,
       });
       console.log("Updated your precense to layout 2")
   } else {
       console.error("There was an error getting the weather. Did you follow the steps?")
   }
   
   
 })
 .catch(error => {
   console.error(error);
 });
}


layout1(600000)

setInterval(function () {
   layout2(300000)
   setTimeout(function () {
    layout1(300000)
   }, 300000)
}, 600001);

client.on('connected', () => {
    console.log("Current Weather Synopsis x Discord")
    console.log("We have connected to your discord account!")
})
