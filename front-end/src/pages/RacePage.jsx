import { useParams } from "react-router-dom";

const RacePage = () => {
    const { carId } = useParams();

    return (
        <>
        <h2>Race Page for Car ID: {carId}</h2>
        </>
    )
};

export default RacePage;