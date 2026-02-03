import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import CartContext from "../../store/CartContext";

const Candy = (props) => {
    const { candy } = props;
    
    const cartCtx = useContext(CartContext);

    const addCartHandler = () => {
        console.log(`Adding ${JSON.stringify(candy)} to cart.`);
        cartCtx.addItem({
            ...candy,
            quantity: 1
        })
    }

    return (
        <Card className="candy-card bg-secondary text-white flex-fill">
            <Card.Img variant="top" src={candy.imageUrl} alt={candy.name} />
            <Card.Body>
                <Card.Title>{candy.name}</Card.Title>
                <Card.Text>{candy.description}</Card.Text>
                <Card.Text className="price">${candy.price.toFixed(2)}</Card.Text>
                <Button variant="primary" onClick={addCartHandler}>Add to Cart</Button>
            </Card.Body>
        </Card>
    )
}

export default Candy;