import './CurrentWeather.css'
import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import weatherService from "../services/weatherService"
import LoadingContainer from "./LoadingContainer"
import ErrorContainer from './ErrorContainer'

function CurrentWeather({ location }) {
    const currentDate = new Date();
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        weatherService.getCurrentWeather(location)
            .then(data => {
                setWeatherData(data)
                setError(null)
                console.log(data)
            })
            .catch(error => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [location])

    const getTime = (unixtimestamp) => {
        const date = new Date(unixtimestamp * 1000)
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const timeFormatted = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`

        return timeFormatted
    }

    const getDayOfWeek = () => {
        switch (currentDate.getDay()) {
            case 1:
                return "Monday"
            case 2:
                return "Tuesday"
            case 3:
                return "Wednesday"
            case 4:
                return "Thursday"
            case 5:
                return "Friday"
            case 6:
                return "Saturday"
            case 0:
                return "Sunday"
        }
    }

    const monthOfYear = () => {
        switch (currentDate.getMonth()) {
            case 0:
                return "January"
            case 1:
                return "February"
            case 2:
                return "March"
            case 3:
                return "April"
            case 4:
                return "May"
            case 5:
                return "June"
            case 6:
                return "July"
            case 7:
                return "August"
            case 8:
                return "September"
            case 9:
                return "October"
            case 10:
                return "November"
            case 11:
                return "December"
        }
    }

    const ordinalSuffix = (number) => {
        if (number >= 11 && number <= 13) {
            return "th"
        }

        switch (number % 10) {
            case 1:
                return "st"
            case 2:
                return "nd"
            case 3:
                return "rd"
            default:
                return "th"
        }
    }

    const windDirection = () => {
        const angle = weatherData.wind.deg
        switch (true) {
            case angle >= 0 && angle < 11.25:
            case angle >= 348.75 && angle < 360:
                return "N";
            case angle >= 11.25 && angle < 33.75:
                return "NNE";
            case angle >= 33.75 && angle < 56.25:
                return "NE";
            case angle >= 56.25 && angle < 78.75:
                return "ENE";
            case angle >= 78.75 && angle < 101.25:
                return "E";
            case angle >= 101.25 && angle < 123.75:
                return "ESE";
            case angle >= 123.75 && angle < 146.25:
                return "SE";
            case angle >= 146.25 && angle < 168.75:
                return "SSE";
            case angle >= 168.75 && angle < 191.25:
                return "S";
            case angle >= 191.25 && angle < 213.75:
                return "SSW";
            case angle >= 213.75 && angle < 236.25:
                return "SW";
            case angle >= 236.25 && angle < 258.75:
                return "WSW";
            case angle >= 258.75 && angle < 281.25:
                return "W";
            case angle >= 281.25 && angle < 303.75:
                return "WNW";
            case angle >= 303.75 && angle < 326.25:
                return "NW";
            case angle >= 326.25 && angle < 348.75:
                return "NNW";
        }
    }

    return (
        <>
            {weatherData && !loading && !error && (
                <Container className="currentweather-container mt-3">
                    <p className="location-name mt-4 mb-3">{weatherData.name}, {weatherData.sys.country}</p>
                    <p className="date">
                        {`${getDayOfWeek()} ${currentDate.getDate()}${ordinalSuffix(currentDate.getDay())} of ${monthOfYear()} ${currentDate.getFullYear()}`}
                    </p>
                    <p className="location-name">{`${currentDate.getHours()}:00`}</p>

                    <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}></img>
                    <p>{weatherData.weather[0].description}</p>

                    <p className="temperature mb-3"> {Math.round(weatherData.main.temp)} °C</p>

                    <Row className="mb-4">
                        <Col className="weather-info mx-2 mb-3">
                            <strong>Wind</strong>
                            <span>{weatherData.wind.speed} m/s</span>
                            <i
                                className="bi bi-arrow-up-circle weather-info-icon"
                                style={{ transform: `rotate(${weatherData.wind.deg}deg)` }}>

                            </i>
                            <p>{windDirection()}</p>
                        </Col>
                        <Col className="weather-info mx-2 mb-3">
                            <strong>Sunrise</strong>
                            <div className="icon-info">
                                <i className="bi bi-sunrise weather-info-icon"></i>
                                <p>{getTime(weatherData.sys.sunrise)}</p>
                            </div>

                            <strong>Sunset</strong>
                            <div className="icon-info">
                                <i className="bi bi-sunset weather-info-icon"></i>
                                <p>{getTime(weatherData.sys.sunset)}</p>
                            </div>
                        </Col>
                        <Col className="weather-info mx-2 mb-3">
                            <strong>Humidity</strong>
                            <div className="icon-info">
                                <i className="bi bi-moisture weather-info-icon"></i>
                                <p>{weatherData.main.humidity} %</p>
                            </div>
                            <strong>Visibility</strong>
                            <div className="icon-info">
                                <i className="bi bi-cloud-fog2 weather-info-icon"></i>
                                <p>{weatherData.visibility / 1000} km</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}

            {loading && (
                <LoadingContainer />
            )}

            {error && (
                <ErrorContainer />
            )}
        </>
    )
}

export default CurrentWeather