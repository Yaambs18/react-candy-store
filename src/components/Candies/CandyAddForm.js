import { useRef, useState } from "react";
import { Spinner } from "react-bootstrap";

import "./CandyForm.css";
import { useNavigate } from "react-router-dom";

const CandyAddForm = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const nameInputRef = useRef();
    const descriptionInputRef = useRef();
    const priceInputRef = useRef();
    const imageInputRef = useRef();

    const navigate = useNavigate();

    const submitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const enteredName = nameInputRef.current.value;
            const enteredDescription = descriptionInputRef.current.value;
            const enteredPrice = priceInputRef.current.value;
            const enteredImageUrl = imageInputRef.current.value;

            const candyData = {
                name: enteredName,
                description: enteredDescription,
                price: +enteredPrice,
                imageUrl: enteredImageUrl
            };

            const response = await fetch(
                `${process.env.REACT_APP_FIREBASE_DATABASE_URL}candies.json`,
                {
                    method: 'POST',
                    body: JSON.stringify(candyData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error.message || 'Failed to add candy');
            }
            navigate('/candies');
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className="candy-add-form m-auto mb-4 p-4 rounded" onSubmit={submitHandler}>
            <div className="d-flex flex-column mb-3 align-items-start">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" ref={nameInputRef} className="w-100 border-0 rounded p-2 font-size-16 focus-ring" />
            </div>
            <div className="d-flex flex-column mb-3 mb-3 align-items-start">
                <label htmlFor="description">Description</label>
                <textarea id="description" rows="2" ref={descriptionInputRef} className="w-100 border-0 rounded p-2 font-size-16 focus-ring" />
            </div>
            <div className="d-flex flex-column mb-3 mb-3 align-items-start">
                <label htmlFor="price">Price</label>
                <input id="price" type="text" ref={priceInputRef} className="w-100 border-0 rounded p-2 font-size-16 focus-ring" />
            </div>
            <div className="d-flex flex-column mb-3 mb-3 align-items-start">
                <label htmlFor="image">Image URL</label>
                <input id="image" type="text" ref={imageInputRef} className="w-100 border-0 rounded p-2 font-size-16 focus-ring" prefix="https://" />
            </div>
            <button className="btn" disabled={isLoading}>
                { isLoading ? <Spinner animation="border" role="button" size="sm" /> : 'Submit'}
            </button>
        </form>
    )
}

export default CandyAddForm;