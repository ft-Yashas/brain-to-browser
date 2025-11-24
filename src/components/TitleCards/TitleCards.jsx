import React, { useRef, useEffect, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category}) => {
  // ✅ cardsRef is defined here, at the top, inside the component
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);
  
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhY2M3OGQ4YTRhNWMxY2JiMjgwMGI4YTU0YWIwMWUzOCIsIm5iZiI6MTc2MzgyODYwNy4wMjQ5OTk5LCJzdWIiOiI2OTIxZTM3ZmQ5OTIwOWE3NmYzMmExYWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.EvMVXzm5Tov2onOTUl0vX_5p987NpOfcefpKPT-g1wc'
  }
};

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
  fetch(
    `https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`,
    options
  )
    .then((res) => res.json())
    .then((data) => {
      setApiData(data.results || []);
    })
    .catch((err) => console.error(err));

  const element = cardsRef.current;
  if (!element) return;

  element.addEventListener("wheel", handleWheel);

  return () => {
    element.removeEventListener("wheel", handleWheel);
  };
}, []);


  return (
    <div className="title-cards">
      <h2>{title?title:"Popular on Netflix"}</h2>

      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={'https://image.tmdb.org/t/p/w500'+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
