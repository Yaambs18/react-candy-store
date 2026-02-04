import { GoogleGenAI } from "@google/genai";

import { useEffect, useState } from "react";

import "./AIRecommendation.css";
import { Modal } from "react-bootstrap";

const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY });

const AIRecommendation = (props) => {

    const [htmlContent, setHtmlContent] = useState(null);

    useEffect(() => {
        analyzeStock();
    }, []);

    const analyzeStock = async () => {
        const stockAnalysisPrompt = `Analyze the current shopping cart and provide 3 personalized candy recommendations based on the items selected. Use the following logic:

        1. **Flavor Pairing**: Suggest candies that complement the flavor profile of the items in the cart (e.g., if they have sour gummies, suggest a different sour fruit or a sweet marshmallow to balance it). 2. **Popularity/Trending**: Include one recommendation from the broader candy list that is a "crowd favorite" but not yet in their cart. 3. **Textural Variety**: If the cart is heavy on "chewy" items, suggest something "crunchy" or "hard" to round out the experience.
        Provide the response as styled, responsive HTML cards. Use only <div> and <p> tags with inline CSS for styling. Ensure the cards look appetizing with soft colors (pinks, blues, or yellows).
        **Input Data:** - Items currently in Cart: ${JSON.stringify(props.cartItems)} - Full Candy Inventory: ${JSON.stringify(props.candyList)}.`;
    
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: stockAnalysisPrompt,
            });
            console.log("AI recommendation Response: ", response);
            const analysis = response.text;
            const htmlString = response?.text.replace('```html', '').replace('```', '').trim();
            const data = <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
            setHtmlContent(data);
        } catch (error) {
            console.error("Error during AI recommendation:", error);
        }
    }
    return (
        <Modal  show={true} onHide={props.onClose} centered backdrop='static'>
            <Modal.Header>
                <Modal.Title>AI Recommendation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="ai-recommendation-modal">
                    {htmlContent}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={props.onClose}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default AIRecommendation;