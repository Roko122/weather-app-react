import { useEffect } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import './Legend.css'
import api_key from '../../apikey'

function WeatherMap({ lat, lon }) {
    return (
        <MapContainer
            center={[lat, lon]}
            zoom={8}
            dragging={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            touchZoom={false}
            zoomControl={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <TileLayer
                url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${api_key}`}
            />
            <TileLayer
                url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${api_key}`}
            />
            <Marker position={[lat, lon]}></Marker>
            <Legend />
            <MapUpdater lat={lat} lon={lon} />
        </MapContainer>
    )
}

const Legend = () => {
    return (
        <div className="legend-container">
            <h4 className="legend-title">Precipitation (mm/h)</h4>
            <div className="legend-bar"></div>
            <div className="legend-labels">
                <span>0</span>
                <span>0.1</span>
                <span>0.2</span>
                <span>0.5</span>
                <span>1</span>
                <span>10</span>
                <span>140</span>
            </div>
        </div>
    );
}

const MapUpdater = ({ lat, lon }) => {
    const map = useMap()

    useEffect(() => {
        if (map) {
            map.setView([lat, lon], map.getZoom())
        }
    }, [lat, lon, map])

    return null;
}

export default WeatherMap