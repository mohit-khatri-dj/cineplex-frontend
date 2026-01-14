import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import axios from "axios";


function Recommendations({ movies, onDetails, onBook, setCurrentPage }) {
    const [recommendations, setRecommendations] = useState([]);
    const token = localStorage.getItem("authToken");

    useEffect(() => {        
        const response = axios.get("http://127.0.0.1:8000/api/recs-movies/", {
                                headers: {
                                    
                                    'Authorization': `Token ${token}` 
                                }
        })
        .then(response => {
            setRecommendations(response.data);
            console.log("recommendations:", response.data);
        })
        .catch(error => {
            console.log("Failed to fetch recommendations. Please try again.");        
        });
    }, []);
  return (
    <div>
          <section id="movies-page" className="page active">
              <div className="container">
                  <div className="movies-header">
                      <h1 className="page-title">AI Recommended Movies</h1>

                  </div>

                  <div className="movies-grid">
                      {recommendations.length === 0 ? (
                          <p className="no-results" style={{ textAlign: "center", color: "var(--color-text-secondary)", margin: "2rem" }}>
                             AI is fetching your recommendations...
                          </p>
                      ) : (
                          recommendations.map(movie => (
                              <MovieCard
                                  key={movie.id}
                                  movie={movie}
                                  onDetails={onDetails}
                                  onBook={onBook}
                                  setCurrentPage={setCurrentPage}
                              />
                          ))
                      )}
                  </div>

              </div>
          </section>
    </div>
  )
}

export default Recommendations;
