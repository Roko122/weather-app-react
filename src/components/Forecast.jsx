import './Forecast.css'
import { useEffect, useState } from "react"
import { Spinner, Col, Container, Row } from "react-bootstrap"
import weatherService from "../services/weatherService"
import LoadingContainer from "./LoadingContainer"
import ErrorContainer from './ErrorContainer'

function Forecast({ location }) {
    const [forecastData, setForecastData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        weatherService.getForecast(location)
            .then(data => {
                setError(null)
                setForecastData(processForecastData(data))
            })
            .catch(error => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [location])

    const processForecastData = (data) => {
        const days = {};

        data.list.forEach(forecast => {
            const date = new Date(forecast.dt_txt)
            const dayOfTheMonth = date.getDate()

            if (!days[dayOfTheMonth]) {
                days[dayOfTheMonth] = {
                    dayOfTheMonth: dayOfTheMonth,
                    dayOfWeek: getDayOfWeek(date.getDay()),
                    temperatures: [],
                    icons: [],
                    descriptions: []
                }
            }

            days[dayOfTheMonth].temperatures.push(forecast.main.temp)
            days[dayOfTheMonth].icons.push(forecast.weather[0].icon)
            days[dayOfTheMonth].descriptions.push(forecast.weather[0].description)
        })

        return Object.values(days).map(dayOfTheMonth => {
            const minTemp = Math.round(Math.min(...dayOfTheMonth.temperatures))
            const maxTemp = Math.round(Math.max(...dayOfTheMonth.temperatures))
            const icon = dayOfTheMonth.icons[Math.floor(dayOfTheMonth.icons.length / 2)]
            const description = dayOfTheMonth.descriptions[Math.floor(dayOfTheMonth.descriptions.length / 2)]

            return {
                dayOfTheMonth: dayOfTheMonth.dayOfTheMonth,
                dayOfWeek: dayOfTheMonth.dayOfWeek,
                location: `${data.city.name}, ${data.city.country}`,
                minTemp,
                maxTemp,
                icon,
                description
            }
        }).slice(0, 5)
    }

    const getDayOfWeek = (date) => {
        switch (date) {
            case 1:
                return "Mon"
            case 2:
                return "Tue"
            case 3:
                return "Wed"
            case 4:
                return "Thu"
            case 5:
                return "Fri"
            case 6:
                return "Sat"
            case 0:
                return "Sun"
        }
    }

    return (
        <>
            {forecastData && !loading && !error && (
                <Container className="forecast-container mt-3">
                    <p className="location-name mt-4 mb-3">{forecastData[0].location}</p>
                    <p className="date mb-3">5-Day Forecast</p>
                    <Row className="mb-4 justify-content-center">
                        {forecastData.map((forecast) => {
                            return (
                                <Col xs={10} md={3} className="forecast-info mb-3 mx-2" key={forecast.dayOfTheMonth}>
                                    <strong>{forecast.dayOfWeek}</strong>
                                    <img src={`http://openweathermap.org/img/wn/${forecast.icon}@2x.png`}></img>
                                    <small>{forecast.description}</small>
                                    <p>{forecast.minTemp}°C / <strong>{forecast.maxTemp}°C</strong></p>
                                </Col>
                            )
                        })}
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

export default Forecast