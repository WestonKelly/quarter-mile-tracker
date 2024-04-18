import { useOutletContext } from "react-router-dom"
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const HomePage = () => {
    const { user } = useOutletContext();
    return (
        <>
        <div className="home-page-background">
            <div className="home-page-inner-container">
                <h1>Welcome!{user && ` ${user}`}</h1>
                {!user && (
                    <div className="button-container">
                        <Link to="/login/">
                            <Button variant="primary">Login</Button>
                        </Link>
                        <Link to="/signup/">
                            <Button variant="primary">Sign Up</Button>
                        </Link>
                    </div>
                )}
                {user && (
                    <div className="text-center">
                        <Link to="/cars/">
                            <Button variant="primary">Go to Cars</Button>
                        </Link>
                        <p className="welcome-message">Create or select a car to start racing!</p>
                    </div>
                )}
                {!user && (
                    <p className="welcome-message">Sign up or log in to create a car and start racing!</p>
                )}
            </div>
        </div>
        </>
    )
};

export default HomePage;