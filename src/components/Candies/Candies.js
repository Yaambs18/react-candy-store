import { useCallback, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Candy from "./Candy";

const dummyCandies = [
    {
        id: "c1",
        name: "Chocolate Bar",
        description: "Delicious milk chocolate bar.",
        price: 20.0,
    },
    {
        id: "c2",
        name: "Gummy Bears",
        description: "Colorful and chewy gummy bears.",
        price: 15.0,
    },
    {
        id: "c3",
        name: "Lollipop",
        description: "Sweet and fruity lollipop.",
        price: 5.0,
    }
];

const Candies = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [candies, setCandies] = useState([]);
    const [error, setError] = useState (null);

    const fetchCandies = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}candies.json`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error.message || "Failed to fetch candies");
            }
            if (!data || Object.keys(data).length === 0) {
                setCandies(dummyCandies);
                return;
            }
            const loadedCandies = [];
            for (const key in data) {
                loadedCandies.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price,
                    imageUrl: data[key].imageUrl
                })
            }
            setCandies(loadedCandies);
        } catch (error) {
            // setError(error.message);
            console.error("Error fetching candies:", error);
        } finally {
            // setCandies(dummyCandies);
            setIsLoading(false);
        }
    })
    useEffect(() => {
        fetchCandies();
    }, []);
    return (
        <div className="candies">
            {isLoading && <Spinner animation="border" role="status" />}
            { error && <p className="error">{error}</p>}
            { !isLoading && !error && candies.length === 0
                &&
                <p>No candy found.</p>
            }
            { !isLoading && !error && candies.length > 0 &&
                <ul className="candy-list d-flex flex-wrap gap-3 list-unstyled justify-content-center m-4">
                    {candies.map((candy) => {
                        return <Candy key={candy.id} candy={candy} />;
                    })}
                </ul>
            }
        </div>
    )
}

export default Candies;