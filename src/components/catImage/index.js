import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./styles.module.css";

export default function CatImage() {
  const BASE_URL = "https://api.thecatapi.com/v1/images/search";
  const [cat, setCat] = useState(null);
  const catRef = useRef(null);

  function moveCatRandom() {
    const img = catRef.current;
    if (img) {
      const newX = Math.random() * (window.innerWidth - img.offsetWidth);
      const newY = Math.random() * (window.innerHeight - img.offsetHeight);
      img.style.left = `${newX}px`;
      img.style.top = `${newY}px`;
    }
  }

  async function getCatImage() {
    try {
      const response = await axios.get(`${BASE_URL}`);
      console.log(response.data[0].url);
      setCat(response.data[0].url);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCatImage();
  }, []);

  return (
    <>
      <div className={styles.catWrapper}>
        <button className={styles.catButton} onClick={getCatImage}>
          New Cat
        </button>
      </div>
      <div>
        <img
          onLoad={moveCatRandom}
          ref={catRef}
          src={cat}
          alt="just a random cat"
        />
      </div>
    </>
  );
}
