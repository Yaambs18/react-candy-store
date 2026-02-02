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
            const response = await fetch("https://crudcrud.com/api/5532a05a2f67488fa168287a4682d7c0/candies", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error.message || "Failed to fetch candies");
            }
            console.log(data);
            if (!data.candies) {
                setCandies(dummyCandies);
                return;
            }
            setCandies(data.candies || []);
        } catch (error) {
            // setError(error.message);
            console.error("Error fetching candies:", error);
        } finally {
            setCandies(dummyCandies);
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