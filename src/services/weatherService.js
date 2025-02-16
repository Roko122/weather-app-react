import axios from "axios"
import api_key from "../../apikey.js"

const baseURL = "https://api.openweathermap.org/data/2.5/"

const getCurrentWeather = (location) => {
    return axios.get(`${baseURL}/weather`, {
        params: {
            q: location,
            appid: api_key,
            units: "metric"
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching weather data:", error)
        throw error
    })
}

const getForecast = (location) => {
    return axios.get(`${baseURL}/forecast`, {
        params: {
            q: location,
            appid: api_key,
            units: "metric"
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching forecast data:", error)
        throw error
    })
}

const getLocation = (lat, lon) => {
    return axios.get(`http://api.openweathermap.org/geo/1.0/reverse?`, {
        params: {
            lat: lat,
            lon: lon,
            limit: 1,
            appid: api_key,
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching location data:", error)
        throw error
    })
}

const getCoordinates = (location) => {
    return axios.get(`http://api.openweathermap.org/geo/1.0/direct?`, {
        params: {
            q: location,
            appid: api_key,
            limit: 1
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching location data:", error)
        throw error
    })
}

export default { getCurrentWeather, getForecast, getLocation, getCoordinates }