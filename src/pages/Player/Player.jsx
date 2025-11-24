import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhY2M3OGQ4YTRhNWMxY2JiMjgwMGI4YTU0YWIwMWUzOCIsIm5iZiI6MTc2MzgyODYwNy4wMjQ5OTk5LCJzdWIiOiI2OTIxZTM3ZmQ5OTIwOWE3NmYzMmExYWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.EvMVXzm5Tov2onOTUl0vX_5p987NpOfcefpKPT-g1wc",
    },
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );

        console.log("TMDB video status:", res.status);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("TMDB video data:", data);

        // pick first YouTube trailer as a safe choice
        const firstVideo =
          data.results?.find(
            (v) => v.site === "YouTube" && v.type === "Trailer"
          ) || data.results?.[0];

        if (!firstVideo) {
          console.warn("No video results found for this movie.");
          return;
        }

        setApiData(firstVideo);
      } catch (err) {
        console.error("TMDB video fetch error:", err);
      }
    };

    fetchVideo();
  }, []);

  const youtubeUrl = apiData.key
    ? `https://www.youtube.com/embed/${apiData.key}`
    : "";

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="Back" onClick={()=>{navigate(-2)}}/>

      {/* Only render iframe once we actually have a key */}
      {youtubeUrl ? (
        <iframe
          width="90%"
          height="90%"
          src={youtubeUrl}
          title={apiData.name || "Trailer"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : (
        <p style={{ color: "white" }}>Loading trailer…</p>
      )}

      <div className="player-info">
        <p>{apiData.published_at.slice(0,10) || "Date unknown"}</p>
        <p>{apiData.name || "No title"}</p>
        <p>{apiData.type || "Video"}</p>
      </div>
    </div>
  );
};

export default Player;
