import React, {useState} from 'react'
import './rating.module.css'
import { FaStar } from 'react-icons/fa'; //npm install react-icons --save

const Rating = () => {

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return <div className="icon">
        {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

            return (
                
            <label>
                <input 
                type="radio" 
                name="rating" 
                value={ratingValue} 
                onClick = {() => setRating(ratingValue)}
                />
                <FaStar className="star" 
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#777B7E"} 
                size={30} 
                onMouseEnter = { () => setHover(ratingValue)}
                onMouseLeave = { () => setHover(null)}
                />
            </label>);
        })}
    </div>
}
        
export default Rating;
