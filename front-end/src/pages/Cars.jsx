import { useState, useEffect } from "react";
import { getUserCars } from "../utilities";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Cars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            setCars(await getUserCars());
        };
        fetchCars();
    }, [])

    return (
        <Container>
        <h2>User Cars</h2>
        <Row>
          {cars.map((car, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{car.year} {car.make} {car.model}</Card.Title>
                  <Card.Text>
                    Horsepower: {car.horsepower}<br />
                    Weight: {car.weight}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    )
};

export default Cars;