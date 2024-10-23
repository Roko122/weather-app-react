import './Forecast.css'
import { useEffect, useState } from "react"
import { Spinner, Col, Container, Row } from "react-bootstrap"
import weatherService from "../services/weatherService"
import LoadingContainer from "./LoadingContainer"
import ErrorContainer from './ErrorContainer'

function Forecast() {
    const [weatherData, setWeatherData] = useState("lol")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const getDayOfWeek = () => {
        switch (currentDate.getDay()) {
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
            {weatherData && !loading && !error && (
                <Container className="forecast-container mt-3">
                    <p className="location-name mt-4 mb-3">Joensuu, FI</p>
                    <p className="date mb-3">5-Day Forecast</p>
                    <Row className="mb-4 justify-content-center">
                        <Col xs={10} md={2} className="forecast-info mb-3 mx-2">
                            <strong>Mon</strong>
                            <i className="bi bi-sunrise weather-info-icon"></i>
                            <p>13°C / <strong>25°C</strong></p>
                        </Col>
                        <Col xs={10} md={2} className="forecast-info mb-3 mx-2">
                            <strong>Mon</strong>
                            <i className="bi bi-sunrise weather-info-icon"></i>
                            <p>13°C / <strong>25°C</strong></p>
                        </Col>
                        <Col xs={10} md={2} className="forecast-info mb-3 mx-2">
                            <strong>Mon</strong>
                            <i className="bi bi-sunrise weather-info-icon"></i>
                            <p>13°C / <strong>25°C</strong></p>
                        </Col>
                        <Col xs={10} md={2} className="forecast-info mb-3 mx-2">
                            <strong>Mon</strong>
                            <i className="bi bi-sunrise weather-info-icon"></i>
                            <p>13°C / <strong>25°C</strong></p>
                        </Col>
                        <Col xs={10} md={2} className="forecast-info mb-3 mx-2">
                            <strong>Mon</strong>
                            <i className="bi bi-sunrise weather-info-icon"></i>
                            <p>13°C / <strong>25°C</strong></p>
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

export default Forecast