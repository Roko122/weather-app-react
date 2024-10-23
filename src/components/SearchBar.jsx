import { Form, InputGroup, Button } from "react-bootstrap"
import './SearchBar.css'
import { useState } from "react"
import weatherService from "../services/weatherService";

function SearchBar({ setLocation }) {
    const [userInput, setUserInput] = useState("")

    const handleUserInput = (e) => {
        setUserInput(e.target.value)
    }

    const handleInput = (e) => {
        e.preventDefault()
        setLocation(userInput)
        setUserInput("")
    }

    const userLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                weatherService.getLocation(latitude, longitude)
                    .then(data => {
                        setLocation(data[0].name)
                    })
                    .catch(error => {
                        console.error(error)
                    })
            })
        }
    }

    return (
        <Form className="searchbar-container mb-3" onSubmit={handleInput}>
            <Button onClick={userLocation} className="location-button" variant="primary">
                <i className="bi bi-geo-alt-fill"></i>
            </Button>
            <InputGroup>
                <Form.Control
                    name="location"
                    value={userInput}
                    onChange={handleUserInput}
                    placeholder="Enter a location"
                    aria-label="Enter a location"
                />
                <Button onClick={handleInput} className="search-button" variant="primary" id="button-addon2">
                    Search
                </Button>
            </InputGroup>
        </Form>
    )
}

export default SearchBar