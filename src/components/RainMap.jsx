import './Rainmap.css'
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import weatherService from "../services/weatherService"
import LoadingContainer from "./LoadingContainer"
import ErrorContainer from './ErrorContainer'
import WeatherMap from './WeatherMap'

function Rainmap({ location }) {
    const [mapData, setMapData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        weatherService.getCoordinates(location)
            .then(data => {
                setError(null)
                const dataForMap = {
                    lat: data[0].lat,
                    lon: data[0].lon,
                    location: `${data[0].name}, ${data[0].country}`
                }
                setMapData(dataForMap)
            })
            .catch(error => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [location])

    return (
        <>
            {mapData && !loading && !error && (
                <Container className="rainmap-container mt-3">
                    <p className="location-name mt-4 mb-3">{mapData.location}</p>
                    <p className="date rain mb-3">
                        <i className="bi bi-cloud-rain weather-info-icon"></i>
                        Precipitation
                    </p>
                    <WeatherMap lat={mapData.lat} lon={mapData.lon} />
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

export default Rainmap