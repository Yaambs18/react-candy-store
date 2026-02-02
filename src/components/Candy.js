import { Button, Card } from "react-bootstrap";

const Candy = (props) => {
    const { candy } = props;

    const addCartHandler = () => {
        console.log(`Adding ${JSON.stringify(candy)} to cart.`);
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