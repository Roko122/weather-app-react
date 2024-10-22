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

export default { getCurrentWeather }