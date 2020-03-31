import React from 'react'
import './rating.css'
import {FaStar} from 'react-icons/fa'; //npm install react-icons --save

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            hover: null
        }
    }

    setRating(value) {
        this.setState({ rating: value });
        this.props.getRating(value);
    }

    render() {
    return <div className="wrapper">
        {[...Array(5)].map((star,i) => {
            const ratingValue = i + 1;

            return (
                <label>
                    <input 
                    type ="radio"
                    name="rating"
                    value={ratingValue}
                    onClick = {() => this.setRating(ratingValue === this.state.rating ? 0 : ratingValue)}
                    />
                    <FaStar className="star"
                    color={ratingValue <= (this.state.hover || this.state.rating) ? "#952BD2" : "#A7AAAC"}
                    size={32}
                    onMouseEnter = {() => this.setState({ hover: ratingValue })}
                    onMouseLeave = {() => this.setState({ hover: this.state.rating})}
                    />
                </label>
            )
        })}
    </div>
    }
}

export default Rating