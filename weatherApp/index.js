const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '27881e34967bae34428eec97160312a4';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather_info ={
        temperature :weather.main.temp,
         city :weather.name,
      description :weather.weather[0].description,
     icon : weather.weather[0].icon
     }
        res.render('index', {weather:weather_info,  error: null});
      }
    }
  });
})
app.listen(3000 , ()=>{
  console.log('App listening on port 3000');
});
//api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=27881e34967bae34428eec97160312a4

//27881e34967bae34428eec97160312a4
