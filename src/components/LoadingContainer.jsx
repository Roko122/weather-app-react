import './CurrentWeather.css'
import { Spinner, Container } from "react-bootstrap"

function LoadingContainer() {
    return (
        <Container className="loading-container my-3">
            <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    )
}

export default LoadingContainer