import { Form, InputGroup, Button } from "react-bootstrap"
import './SearchBar.css'

function SearchBar() {
    return (
        <Form className="searchbar-container mb-3">
            <Button className="location-button" variant="primary">
                <i className="bi bi-geo-alt-fill"></i>
            </Button>
            <InputGroup>
                <Form.Control
                    placeholder="Enter a location"
                    aria-label="Enter a location"
                />
                <Button className="search-button" variant="primary" id="button-addon2">
                    Search
                </Button>
            </InputGroup>
        </Form>
    )
}

export default SearchBar