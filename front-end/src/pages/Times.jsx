import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { getCarTimes } from "../utilities";

const TimesPage = () => {
    const{ carId } = useParams();
    const [timeSlips, setTimeSlips] = useState(null);
    const [notes, setNotes] = useState('');

    const fetchTimes = async () => {
        setTimeSlips(await getCarTimes(carId));
    };

    

    useEffect(() => {
        fetchTimes();
    }, [carId])


    return (
        <>
             <Accordion defaultActiveKey="0" className="custom-accordion">
            {timeSlips && timeSlips.map((timeSlip, index) => (
                    <Accordion.Item eventKey={index.toString()} className="custom-accordion-item bg-light" style={{ width: '400px' }}>
                    <Accordion.Header >{`ET: ${timeSlip.quarter_mile_time} @ ${timeSlip.trap_speed} MPH`}</Accordion.Header>
                    <Accordion.Body>
                            <p>{`Date: ${new Date(timeSlip.created_at).toLocaleString()}`}</p>
                            <p>{`Reaction Time: ${timeSlip.reaction_time}`}</p>
                            <p>{`Sixty Foot Time: ${timeSlip.sixty_foot_time}`}</p>
                            <p>{`Three Thirty Foot Time: ${timeSlip.three_thirty_foot_time}`}</p>
                            <p>{`Eighth Mile Time: ${timeSlip.eighth_mile_time}`}</p>
                            <p>{`Quarter Mile Time: ${timeSlip.quarter_mile_time}`}</p>
                            <p>{`Trap Speed: ${timeSlip.trap_speed}`}</p>
                            <p>{`Notes: ${timeSlip.notes || 'No notes'}`}</p>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Enter notes.."
                                className="form-control mb2"
                            />
                            <button onClick={() => handleSubmitNotes(timeSlip.id)} className="btn btn-primary">Submit</button>
                    </Accordion.Body>
                    </Accordion.Item>
            ))}
        </Accordion>
        </>

    );
};

export default TimesPage;