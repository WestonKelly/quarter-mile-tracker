import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserCars, createCar, deleteCar, updateCar } from "../utilities";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/esm/Button";
import DropdownButton from 'react-bootstrap/Dropdown'

const Cars = () => {
    const { carId } = useParams();
    const [cars, setCars] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newCarData, setNewCarData] = useState({
        year: '',
        make: '',
        model: '',
        horsepower: '',
        weight: '',
    });

    const [selectedCar, setSelectedCar] = useState(null);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowEditModal = (car) => {
      setSelectedCar(car);
      setShowEditModal(true);
    };


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

    const handleEditCar = async () => {
      const success = await updateCar(selectedCar.id, newCarData);
      if (success) {
        await fetchCars();
        handleCloseEditModal();
      }
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCarData({
            ...newCarData,
            [name]: value
        });
    };

    const handleDeleteCar = async (carId) => {
      const confirmDelete = window.confirm("Are your sure you want to delete this car?")
      if (confirmDelete) {
        await deleteCar(carId);
        await fetchCars();
        }
      }
    

    return (
      <div className="background-cars-page">
        <Container className="text-center">
          {cars.length > 0 ? (
        <h2>Your Cars</h2>
          ):(
            <h2>Create a car to start racing!</h2>)}
        <Row>
          {cars.map((car, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <Card className="semi-transparent-card">
                <Card.Body>
                  <Card.Title>{car.year} {car.make} {car.model}</Card.Title>
                  <Card.Text>
                    Horsepower: {car.horsepower}<br />
                    Weight: {car.weight}
                  </Card.Text>
                  
                  <Button variant="danger" onClick={() => handleDeleteCar(car.id)}>Delete</Button>
                  <Button variant="primary" onClick={() => handleShowEditModal(car)}>Edit</Button>
                  <Link to={`/times/${car.id}`}>
                    <Button variant="success">Times</Button>
                  </Link>
                  <Link to={`/race/${car.id}`}>
                    <Button variant="success">Race!</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="add-car-button">
        <Button variant="primary"  onClick={handleShowModal}>Add New Car</Button>
        </div>
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
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Car</Modal.Title>
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
          <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
          <Button variant="primary" onClick={handleEditCar}>Submit Changes</Button>
        </Modal.Footer>
      </Modal>
      </Container>
      </div>
    )
};

export default Cars;