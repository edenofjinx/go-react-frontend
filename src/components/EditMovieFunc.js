import React, {useEffect, useState, Fragment} from "react";
import {Link} from "react-router-dom";
import Input from "./form_components/input";
import Textarea from "./form_components/textarea";
import Select from "./form_components/select";
import Alert from "./ui-components/alert";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./EditMovie.css";

function EditMovieFunc(props) {
    const [movie, setMovie] = useState({});
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);
    const [alert, setAlert] = useState({type: "d-none", message: ""})
    const mpaaOptions = [
            {id: "G", value: "G"},
            {id: "PG", value: "PG"},
            {id: "PG13", value: "PG13"},
            {id: "R", value: "R"},
            {id: "NC17", value: "NC17"},
    ];
    useEffect(() => {
        if (props.jwt === "") {
            props.history.push({
                pathname: "/login",
            });
            return;
        }
        const id = props.match.params.id;
        if (id > 0) {
            fetch(`${process.env.REACT_APP_API_URL}/v1/movie/` + id)
                .then((response) => {
                    if (response.status !== 200) {
                        setError("Invalid response code " + response.status);
                    } else {
                        setError(null);
                    }
                    return response.json();
                })
                .then((json) => {
                    const releaseDate = new Date(json.movie.release_date);
                    let year = releaseDate.getFullYear();
                    let day = releaseDate.getDate();
                    let month = ('0' + (releaseDate.getMonth()+1)).slice(-2);
                    json.movie.release_date = year + '-' + month + '-' + day;
                    setMovie(json.movie)
                });
        }
    }, [props.history, props.jwt, props.match.params.id]);

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setMovie({
            ...movie,
            [name]: value,
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let errors = [];
        const data = new FormData(event.target);
        const payload = Object.fromEntries(data.entries());
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + props.jwt);
        for (const key in payload) {
            if (`${payload[key]}` === '') {
                errors.push(`${key}`);
            }
        }
        setErrors(errors);
        if (errors.length > 0) {
            return false;
        }

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: myHeaders,
        }
        fetch(`${process.env.REACT_APP_API_URL}/v1/admin/editmovie`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setAlert({
                        alert: {type: "alert-danger", message: data.error.message},
                    })
                } else {
                    props.history.push({pathname: "/admin"},)
                }
            })
            .catch(err => {
                setAlert({
                    alert: {type: "alert-danger", message: "Error occurred. Please try again later."},
                })
            })
    };

    const confirmDelete = (event) => {
        confirmAlert({
            title: 'Delete movie?',
            message: 'Are you sure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        const myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        myHeaders.append("Authorization", "Bearer " + props.jwt);
                        fetch(`${process.env.REACT_APP_API_URL}/v1/admin/deletemovie/` + movie.id, {method: "GET", headers: myHeaders})
                            .then(response => response.json())
                            .then(data => {
                                if (data.error) {
                                    setAlert({
                                        alert: {type: "alert-danger", message: data.error.message},
                                    })
                                } else {
                                    setAlert({
                                        alert: {type: "alert-success", message: "Movie deleted."},
                                    })
                                    props.history.push({pathname: "/admin"},)
                                }
                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    };

    const hasErrors = (key) => {
        return errors.indexOf(key) !== -1;
    }

    if (error !== null) {
        return <div>Error: {error.message}</div>
    } else {
        return (
            <Fragment>
                <h2>Add/Edit Movie</h2>
                <Alert alertType={alert.type} alertMessage={alert.message}/>
                <hr/>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="id" id="id" value={movie.id} onChange={handleChange}/>
                    <Input className={hasErrors("title") ? "is-invalid" : ""}
                           title={"Title"}
                           type={"text"}
                           name={"title"}
                           value={movie.title}
                           handleChange={handleChange}
                           errorDiv={hasErrors("title") ? "text-danger" : "d-none"}
                           errorMsg={"Please enter a title"}
                    />
                    <Input className={hasErrors("release_date") ? "is-invalid" : ""}
                           title={"Release date"}
                           type={"date"}
                           name={"release_date"}
                           value={movie.release_date}
                           handleChange={handleChange}
                           errorDiv={hasErrors("release_date") ? "text-danger" : "d-none"}
                           errorMsg={"Please enter a date"}
                    />
                    <Input className={hasErrors("runtime") ? "is-invalid" : ""}
                           title={"Runtime"}
                           type={"text"}
                           name={"runtime"}
                           value={movie.runtime}
                           handleChange={handleChange}
                           errorDiv={hasErrors("runtime") ? "text-danger" : "d-none"}
                           errorMsg={"Please enter a runtime"}
                    />
                    <Select className={hasErrors("mpaa_rating") ? "is-invalid" : ""}
                            title={"MPAA Rating"}
                            name={"mpaa_rating"}
                            options={mpaaOptions}
                            value={movie.mpaa_rating}
                            handleChange={handleChange}
                            placeholder={"Choose..."}
                            errorDiv={hasErrors("mpaa_rating") ? "text-danger" : "d-none"}
                            errorMsg={"Please select a mpaa rating"}
                    />
                    <Input className={hasErrors("rating") ? "is-invalid" : ""}
                           title={"Rating"} type={"text"} name={"rating"} value={movie.rating}
                           handleChange={handleChange}
                           errorDiv={hasErrors("rating") ? "text-danger" : "d-none"}
                           errorMsg={"Please enter a rating"}
                    />
                    <Textarea className={hasErrors("description") ? "is-invalid" : ""}
                              title={"Description"} name={"description"} value={movie.description}
                              handleChange={handleChange}
                              errorDiv={hasErrors("description") ? "text-danger" : "d-none"}
                              errorMsg={"Please enter a description"}/>
                    <hr/>
                    <button className="btn btn-primary">Save</button>
                    <Link to="/admin" className="btn btn-warning ms-1">Cancel</Link>
                    {movie.id > 0 && (
                        <a href="#!" onClick={() => confirmDelete()} className="btn btn-danger ms-1">Delete</a>
                    )}
                </form>
            </Fragment>
        )
    }
}

export default EditMovieFunc;