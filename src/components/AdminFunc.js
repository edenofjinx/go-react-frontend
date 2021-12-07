import React, {useState, useEffect, Fragment} from "react";
import {Link} from "react-router-dom";

function AdminFunc(props) {
    let [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (props.jwt === "") {
            props.history.push({
                pathname: "/login",
            });
            return;
        }
        fetch(`${process.env.REACT_APP_API_URL}/v1/movies`)
            .then((response) => {
                console.log("status code is", response.status)
                if (response.status !== 200) {
                    setError("Invalid response code " + response.status);
                } else {
                    setError(null);
                }
                return response.json();
            })
            .then((json) => {
                setMovies(json.movies)
            });
    }, [props.jwt, props.history]);
    if (!movies) {
        movies = [];
    }
    if (error !== null) {
        return <div>Error: {error.message}</div>
    } else {
        return (
            <Fragment>
                <h2>Movie list</h2>
                <div className="list-group">
                    {movies.map((m) => (
                        <Link
                            to={`admin/movie/${m.id}`}
                            key={m.id}
                            className="list-group-item list-group-item-action">
                            {m.title}
                        </Link>
                    ))}
                </div>
            </Fragment>
        );
    }
}

export default AdminFunc;