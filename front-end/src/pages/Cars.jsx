import { useState, useEffect } from "react";
import { getUserCars, createCar } from "../utilities";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/esm/Button";

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCarData, setNewCarData] = useState({
        year: '',
        make: '',
        model: '',
        horsepower: '',
        weight: '',
    });

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const fetchCars = async () => {
        setCars(await getUserCars());
    };
    
    useEffect(() => {
        fetchCars();
    }, [])

    const handleAddCar = async () => {
        const success = await createCar(newCarData);
        if (success) {
            await fetchCars();
            handleCloseModal();
        }
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCarData({
            ...newCarData,
            [name]: value
        });
    };

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
        <Button variant="primary" onClick={handleShowModal}>Add New Car</Button>
        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
            <div className="mb-3">
              <label htmlFor="year" className="form-label">Year</label>
              <input type="number" className="form-control" id="year" name="year" value={newCarData.year} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="make" className="form-label">Make</label>
              <input type="text" className="form-control" id="make" name="make" value={newCarData.make} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="model" className="form-label">Model</label>
              <input type="text" className="form-control" id="model" name="model" value={newCarData.model} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="horsepower" className="form-label">Horsepower</label>
              <input type="number" className="form-control" id="horsepower" name="horsepower" value={newCarData.horsepower} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="weight" className="form-label">Weight</label>
              <input type="number" className="form-control" id="weight" name="weight" value={newCarData.weight} onChange={handleInputChange} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleAddCar}>Add Car</Button>
        </Modal.Footer>
      </Modal>
      </Container>
    )
};

export default Cars;