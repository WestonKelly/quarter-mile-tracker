import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { generateTime } from "../utilities";
import Card from 'react-bootstrap/Card';

const RacePage = () => {
    const { carId } = useParams();
    const [raceData, setRaceData] = useState(null);

    const handleRaceButtonClick = () => {
        generateTime(carId)
            .then((data) => {
                setRaceData(data);
            })
            .catch((error) => {
                console.error("Error generating time:", error);
            });
    };

    return (
        <>
        <h2>Race Page for Car ID: {carId}</h2>
        <button onClick={handleRaceButtonClick}>Race!</button>
        {raceData && (
                <Card>
                    <Card.Body>
                        <Card.Title>Latest Race Data</Card.Title>
                        <Card.Text>
                            <p>Reaction Time: {raceData.reaction_time}</p>
                            <p>60 Foot Time: {raceData.sixty_foot_time}</p>
                            <p>330 Foot Time: {raceData.three_thirty_foot_time}</p>
                            <p>1/8 Mile Time: {raceData.eighth_mile_time}</p>
                            <p>1/4 Mile Time: {raceData.quarter_mile_time}</p>
                            <p>Trap Speed: {raceData.trap_speed}</p>
                            <p>Notes: {raceData.notes}</p>
                            <p>Created At: {raceData.created_at}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </>
    )
};

export default RacePage;