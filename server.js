/* eslint-disable no-param-reassign */
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-cache, no-store, must-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

app.get("/weather", (req, res) => {
  const location = JSON.parse(req.query.location);
  const latitude = Number(location.latitude);
  const longitude = Number(location.longitude);
  axios.get(`https://api.open-meteo.com/v1/forecast`, {
    params: {
      latitude: latitude, longitude: longitude,
      current: 'temperature_2m,weathercode',
      timezone: 'auto',
    }
  })
    .then(response => {
      res.setHeader("Cache-Control", "no-cache");
      res.json(transformData(response.data.current));
    })
    .catch(error => {
      console.log(error);  // eslint-disable-line no-console
    });
});

app.listen(app.get("port"), () => {
  console.log( // eslint-disable-line no-console
    `Find the server at: http://localhost:${app.get(
      "port"
    )}/`
  );
});

const transformData = (data) => {
  let res;
  res = {
    time: data.time,
    imageAbbr: weather[data.weathercode].imageAbbr,
    weatherDescription: weather[data.weathercode].weatherDescription,
    weatherTemp: data.temperature_2m,
  }
  return res;
}

const weather = {
  0: {
    imageAbbr: 'c',
    weatherDescription: 'Clear',
  },
  1: {
    imageAbbr: 'c',
    weatherDescription: 'Mainly Clear',
  },
  2: {
    imageAbbr: 'lc',
    weatherDescription: 'Light Cloud',
  },
  3: {
    imageAbbr: 'hc',
    weatherDescription: 'Heavy Cloud',
  },
  45: {
    imageAbbr: 'hc',
    weatherDescription: 'Foggy',
  },
  48: {
    imageAbbr: 'hc',
    weatherDescription: 'Rime Fog',
  },
  51: {
    imageAbbr: 'lr',
    weatherDescription: 'Light Drizzle',
  },
  53: {
    imageAbbr: 'lr',
    weatherDescription: 'Drizzle',
  },
  55: {
    imageAbbr: 'lr',
    weatherDescription: 'Heavy Drizzle',
  },
  56: {
    imageAbbr: 'sl',
    weatherDescription: 'Light Freezing Drizzle',
  },
  57: {
    imageAbbr: 'sl',
    weatherDescription: 'Freezing Drizzle',
  },
  61: {
    imageAbbr: 'lr',
    weatherDescription: 'Light Rain',
  },
  63: {
    imageAbbr: 'lr',
    weatherDescription: 'Rain',
  },
  65: {
    imageAbbr: 'hr',
    weatherDescription: 'Heavy Rain',
  },
  66: {
    imageAbbr: 'sl',
    weatherDescription: 'Light Freezing Rain',
  },
  67: {
    imageAbbr: 'sl',
    weatherDescription: 'Freezing Rain',
  },
  71: {
    imageAbbr: 'sn',
    weatherDescription: 'Light Snow',
  },
  73: {
    imageAbbr: 'sn',
    weatherDescription: 'Snow',
  },
  75: {
    imageAbbr: 'sn',
    weatherDescription: 'Heavy Snow',
  },
  77: {
    imageAbbr: 'sn',
    weatherDescription: 'Snow Grains',
  },
  80: {
    imageAbbr: 's',
    weatherDescription: 'Light Showers',
  },
  81: {
    imageAbbr: 's',
    weatherDescription: 'Showers',
  },
  82: {
    imageAbbr: 's',
    weatherDescription: 'Heavy Showers',
  },
  85: {
    imageAbbr: 'sn',
    weatherDescription: 'Light Snow Showers',
  },
  86: {
    imageAbbr: 'sn',
    weatherDescription: 'Snow Showers',
  },
  95: {
    imageAbbr: 't',
    weatherDescription: 'Thunderstorm',
  },
  96: {
    image: 'h',
    weatherDescription: 'Light Thunderstorms With Hail',
  },
  99: {
    image: 'h',
    weatherDescription: 'Thunderstorm With Hail',
  },
};
