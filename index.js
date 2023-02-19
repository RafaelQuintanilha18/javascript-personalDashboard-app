//Global Variables
let authorName = document.getElementById("author")
const bitcoinPrice = document.getElementById("bitcoin--price")
const bitcoinImg = document.getElementById("bitcoin--imgname")


//Fetching API for Background IMG
  fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
      document.body.style.backgroundImage =`url(${data.urls.full})`
      authorName.innerText = `Photo by ${data.user.name}`
    })

// Displaying Time
  function getCurrentTime() {
    let date = new Date()
    document.getElementById("time").innerText = date.toLocaleTimeString("en-us", {timeStyle: "short"})
  }
    setInterval(getCurrentTime, 1000);

// Fetching API for Crypo
  fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(res => res.json())
    .then(data => {
      bitcoinImg.innerHTML = `
      <img src=${data.image.small}>
      <span>${data.name}</span>
      `
      bitcoinPrice.innerHTML = `
      <p>💵: $${data.market_data.current_price.usd}</p>
      <p>📈: $${data.market_data.high_24h.usd}</p>
      <p>📉: $${data.market_data.low_24h.usd}</p>
      `
    })
    .catch(err => {
      console.log("Something went wrong. Try again")
    })

//Fetching API Geolocation and Weather
  navigator.geolocation.getCurrentPosition((position) => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
      .then(res => {
        if (!res.ok ) {
          throw Error("We couldn't access your location. Check your settings")
        }
        return res.json()})
      .then(data => {
        document.getElementById("weather").innerHTML =
        `
        <div class="weather--top">
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        <p>${Math.round(data.main.temp)}ºC</p>
        </div>
        <div class="weather--bottom">
          <p>${Math.round(data.main.feels_like)}ºC (feels like)</p>
          <p>${data.name}</p>
        </div>
        `
        console.log(data.main.temp)
      })
      .catch(err => console.log(err))
  });
