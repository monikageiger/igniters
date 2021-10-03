
import { useState } from "react";
import axios from "axios";
import React from "react";
import { randomImageUrl } from "../javascripts/randomImageUrl";
const API_URL = "http://localhost:3000/api";

function AddOrganizationPage(props) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  // const [picture, setPicture] = useState("");
  // const [pictureUrl, setPictureUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      country,
      city,
      street,
      email,
      categories,
      language,
      description,
      url,
      // picture: req.file.path,
      picture: randomImageUrl()
    };
    // const picture = req.file.path

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .post(`${API_URL}/orgs`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        setName("");
        setCountry("");
        setCity("");
        setStreet("");
        setEmail("");
        setCategories("");
        setLanguage("");
        setDescription("");
        setUrl("");
        // setPicture("");
        props.history.push(`/my-orgs`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddProject">
      <h3>Add Organization</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <hr />

        <label>Country:</label>
        <textarea
          type="text"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <hr />

        <label>City:</label>
        <textarea
          type="text"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <hr />

        <label>Street:</label>
        <textarea
          type="text"
          name="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <hr />

        <label>Email:</label>
        <textarea
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <hr />

        <label>Categories:</label>
        <textarea
          type="text"
          name="categories"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        />
        <hr />

        <label>Language:</label>
        <textarea
          type="text"
          name="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
        <hr />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Url:</label>
        <textarea
          type="text"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {/* <label>Picture url:</label>
        <input
          type="file"
          name="picture"
          id="picture"
          // value={picture}
          onChange={(e) => {
            console.log(e.target.files[0].name)
            console.log(e.target.files)
            setPicture(e.target.files[0])}}
        /> */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddOrganizationPage;

