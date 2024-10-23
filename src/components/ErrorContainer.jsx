import './CurrentWeather.css'
import { Container } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'

function ErrorContainer() {
    return (
        <Container className="loading-container my-3">
            <div>
                <div className="error-container">
                    <FontAwesomeIcon icon={faSun} spin size="2x" style={{ color: "#FFD43B", }} />
                    <strong>404 Not Found</strong>
                    <FontAwesomeIcon icon={faSun} spin size="2x" style={{ color: "#FFD43B", }} />
                </div>
                <p className="date">Oh no! Couldn't find weather data from given location.<br></br>
                    Please check spelling and try again.</p>
            </div>
        </Container>
    )
}

export default ErrorContainer