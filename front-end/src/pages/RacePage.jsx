import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { generateTime, getWeather } from "../utilities";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";

const RacePage = () => {
    const { carId } = useParams();
    const [raceData, setRaceData] = useState(null);
    const [weather, setWeather] = useState(null);

    const handleRaceButtonClick = () => {
        generateTime(carId)
            .then((data) => {
                setRaceData(data);
            })
            .catch((error) => {
                console.error("Error generating time:", error);
            });
    };

    const fetchWeather = async () => {
        setWeather(await getWeather());
        console.log(weather)
    }

    useEffect(() => {
        fetchWeather()
    }, [])

    return (
        <>
        <div className="background-race-page">
        <Container>
        <h2>Race Page for Car ID: {carId}</h2>
        {weather && (
            <div className="weather-card">
                {console.log("Weather data structure:", weather.data.values.temperature)}
                <p>Temperature: {weather.data.values.temperature} Deg. F</p>
                <p>Pressure Surface Level: {weather.data.values.pressureSurfaceLevel} inHg</p>
            </div>
        )}
        <div className="text-center mb-3">
         <Button variant="primary" onClick={handleRaceButtonClick}>Race!</Button>
         </div>
        {raceData && (
                <Card className="semi-transparent-card">
                    <Card.Body>
                        <Card.Title>Latest Race Data</Card.Title>
                        <Card.Text>
                            <p>{`Date: ${new Date(raceData.created_at).toLocaleString()}`}</p>
                            <p>Reaction Time: {raceData.reaction_time}</p>
                            <p>60 Foot Time: {raceData.sixty_foot_time}</p>
                            <p>330 Foot Time: {raceData.three_thirty_foot_time}</p>
                            <p>1/8 Mile Time: {raceData.eighth_mile_time}</p>
                            <p>1/4 Mile Time: {raceData.quarter_mile_time}</p>
                            <p>Trap Speed: {raceData.trap_speed}</p>
                            <p>Notes: {raceData.notes}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
            </Container>
            </div>
        </>
    )
};

export default RacePage;