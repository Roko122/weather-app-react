import { Col, Container, Row } from "react-bootstrap"
import './CurrentWeather.css'
import weatherService from "../services/weatherService";
import { useEffect, useState } from "react";

function CurrentWeather({ location }) {
    const currentDate = new Date();
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        weatherService.getCurrentWeather("Joensuu")
            .then(data => {
                setWeatherData(data)
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
            case 1:
                return "January"
            case 2:
                return "February"
            case 3:
                return "March"
            case 4:
                return "April"
            case 5:
                return "May"
            case 6:
                return "June"
            case 7:
                return "July"
            case 8:
                return "August"
            case 9:
                return "September"
            case 10:
                return "October"
            case 11:
                return "November"
            case 12:
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



    return (
        <Container className="currentweather-container mt-4">
            <p className="location-name mt-4 mb-3">{location}</p>
            <p className="date">
                {`${getDayOfWeek()} ${currentDate.getDate()}${ordinalSuffix(13)} of ${monthOfYear()} ${currentDate.getFullYear()}`}
            </p>
            <p className="location-name">{`${currentDate.getHours()}:00`}</p>

            {weatherData && (
                <>
                    <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}></img>
                    <p>{weatherData.weather[0].description}</p>

                    <p className="temperature mb-3"> {Math.round(weatherData.main.temp)} °C</p>

                    <Row className="mb-4">
                        <Col className="weather-info mx-2">
                            <strong>Wind</strong>
                            <span>{weatherData.wind.speed} m/s</span>
                            <i
                                className="bi bi-arrow-up-circle weather-info-icon"
                                style={{ transform: `rotate(${weatherData.wind.deg}deg)` }}>

                            </i>
                        </Col>
                        <Col className="weather-info mx-2">
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
                        <Col className="weather-info mx-2">
                            <strong>Humidity</strong>
                            <div className="icon-info">
                                <i className="bi bi-moisture weather-info-icon"></i>
                                <p>{weatherData.main.humidity} %</p>
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    )
}

export default CurrentWeather