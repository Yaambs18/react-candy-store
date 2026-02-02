import { useState } from "react";
import { Spinner } from "react-bootstrap";

import "./CandyForm.css";

const CandyAddForm = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        setIsLoading(true);
        console.log('Submitted');
        setIsLoading(false);
    }

    return (
        <form className="candy-add-form m-auto mb-4 p-4 rounded" onSubmit={submitHandler}>
            <div className="d-flex flex-column mb-3 align-items-start">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" className="w-100 border-0 rounded p-2 font-size-16 focus-ring" />
            </div>
            <div className="d-flex flex-column mb-3 mb-3 align-items-start">
                <label htmlFor="description">Description</label>
                <textarea id="description" rows="2" className="w-100 border-0 rounded p-2 font-size-16 focus-ring" />
            </div>
            <div className="d-flex flex-column mb-3 mb-3 align-items-start">
                <label htmlFor="price">Price</label>
                <input id="price" type="text" className="w-100 border-0 rounded p-2 font-size-16 focus-ring" />
            </div>
            <div className="d-flex flex-column mb-3 mb-3 align-items-start">
                <label htmlFor="image">Image URL</label>
                <input id="image" type="text" className="w-100 border-0 rounded p-2 font-size-16 focus-ring" prefix="https://" />
            </div>
            <button className="btn" disabled={isLoading}>
                { isLoading ? <Spinner animation="border" role="button" size="sm" /> : 'Submit'}
            </button>
        </form>
    )
}

export default CandyAddForm;