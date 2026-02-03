import { Button } from "react-bootstrap";
import Candies from "../components/Candies/Candies";
import { useNavigate } from "react-router-dom";

const CandiesPage = (props) => {
    const navigate = useNavigate();
    const addClickHandler = () => {
        navigate('/add-candy');
    }

    return (
        <>
            <Button variant="primary" className='mb-2' onClick={addClickHandler}>Add Candy</Button>
            <Candies />
        </>
    )
}

export default CandiesPage;