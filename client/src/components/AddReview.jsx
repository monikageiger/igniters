import { useState } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

function AddReview(props) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);

  const changeRating = ( newRating ) => {
    setRating(newRating)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { orgId } = props;

    const requestBody = { review, rating, orgId };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .post(
        `${API_URL}/reviews`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        // Reset the state to clear the inputs
        setReview("");
        setRating(1);
        props.refreshOrg();
        props.toggleForm();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddReview">
      <form className="reviewForm" onSubmit={handleSubmit}>
        <div className="reviewFormInputContainer">
          <label>Comment:</label>
          <textarea
            placeholder="Write your review here"
            type="text"
            name="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

        <div className="reviewFormInputContainer">
          <label>Rating:</label>

          {/* <textarea
            type="Number"
            name="rating"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          /> */}
          {/* <fieldset class="starability-basic">
            <legend>
              <h6>Rating:</h6>
            </legend>

          <fieldset class="starability-basic">

            <input
              type="radio"
              id="no-rate"
              class="input-no-rate"
              name={rating}
              value="1"
              checked
              aria-label="No rating."
            />
            <input
              type="radio"
              id="first-rate1"
              name={rating}
              value="1"
              onChange={(e) => setRating(e.target.value)}
            />
            <label for="first-rate1" title="Terrible">
              1 star
            </label>
            <input
              type="radio"
              id="first-rate2"
              name={rating}
              value="2"
              onChange={(e) => setRating(e.target.value)}
            />
            <label for="first-rate2" title="Not good">
              2 stars
            </label>
            <input
              type="radio"
              id="first-rate3"
              name={rating}
              value="3"
              onChange={(e) => setRating(e.target.value)}
            />
            <label for="first-rate3" title="Average">
              3 stars
            </label>
            <input
              type="radio"
              id="first-rate4"
              name={rating}
              value="4"
              onChange={(e) => setRating(e.target.value)}
            />
            <label for="first-rate4" title="Very good">
              4 stars
            </label>
            <input
              type="radio"
              id="first-rate5"
              name={rating}
              value="5"
              onChange={(e) => setRating(e.target.value)}
            />
            <label for="first-rate5" title="Amazing">
              5 stars
            </label>
          </fieldset> */}

          <StarRatings
            rating={rating}
            starRatedColor="rgba(124, 94, 241, 0.5)"
            starHoverColor="rgba(124, 94, 241, 0.5)"	
            starEmptyColor='rgb(140, 140, 140)'
            starDimension='30px'
            starSpacing="0"
            changeRating={changeRating}
            numberOfStars={5}
            name='rating'
          />

        </div>

        <div className="reviewFormSubmitButtonContainer">
          <button className="button-52 submitButton" type="submit">
            Add Review
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddReview;
