import React, { useState } from 'react';
import './image.css';

const Image = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // const ACCESS_KEY = "t9EnqtKaegU3GnZTrC4lY_TfkScHMkfIDB2XpbxGrYM";
  // const BASE_URL = "https://api.unsplash.com";
  const fetchImages = async () => {
    if (!query) return;

    try {
      const url = `${BASE_URL}/search/photos?query=${query}&client_id=${ACCESS_KEY}`;
      console.log("Fetching:", url);

      const res = await fetch(url);
      console.log("Fetch Response:", res.status);

      if (!res.ok) {
        throw new Error("Error, Image is not fetched.");
      }

      const data = await res.json();
      console.log("API Response:", data);
      setImages(data.results || []);
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages([]);
    }
  };

  return (
    <div>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Type something to search....."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchImages}>Search</button>
      </div>

      <div className="image-container">
        <h3> ~Result~</h3>
        <div className="image-grid">
          {images.length > 0 ? (
            images.map((img) => (
              <div key={img.id} className="image-item">
                <img
                  src={img.urls.small}
                  alt={img.alt_description || "image"}
                />
              </div>
            ))
          ) : (
            <p>No images Searched </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Image;
