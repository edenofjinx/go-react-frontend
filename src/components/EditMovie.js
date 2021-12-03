import React, {Component, Fragment} from "react";
import Input from "./form_components/input";
import Textarea from "./form_components/textarea";
import Select from "./form_components/select";
import Alert from "./ui-components/alert";
import "./EditMovie.css";

export default class EditMovie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: {
                id: 0,
                title: "",
                release_date: "",
                runtime: "",
                mpaa_rating: "",
                rating: "",
                description: "",
            },
            mpaaOptions: [
                {id: "G", value: "G"},
                {id: "PG", value: "PG"},
                {id: "PG13", value: "PG13"},
                {id: "R", value: "R"},
                {id: "NC17", value: "NC17"},
            ],
            isLoaded: false,
            error: null,
            errors: [],
            alert: {
                type: "d-none",
                message: ""
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let errors = [];
        const data = new FormData(event.target);
        const payload = Object.fromEntries(data.entries());
        for (const key in payload) {
            if (`${payload[key]}` === '') {
                errors.push(`${key}`);
            }
        }
        this.setState({errors: errors})
        if (errors.length > 0) {
            return false;
        }
        console.log(payload);

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(payload)
        }
        fetch("http://localhost:4000/v1/admin/editmovie", requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    this.setState({
                        alert: {type: "alert-danger", message: data.error.message}
                    })
                } else {
                    this.setState({
                        alert: {type: "alert-success", message: "Changes saved!"}
                    })
                }
            })
            .catch(err => {
                this.setState({
                    alert: {type: "alert-danger", message: "Error occurred. Please try again later."}
                })
            })
    }

    handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        this.setState((prevState) => ({
            movie: {
                ...prevState.movie,
                [name]: value,
            }
        }))
    }

    hasErrors(key) {
        return this.state.errors.indexOf(key) !== -1;
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id > 0) {
            fetch("http://localhost:4000/v1/movie/" + id)
                .then((response) => {
                    if (response.status !== "200") {
                        let err = Error;
                        err.Message = "Invalid response code: " + response.status;
                        this.setState({error: err});
                    }
                    return response.json();
                })
                .then((json) => {
                    const releaseDate = new Date(json.movie.release_date);
                    let formattedDate = releaseDate.getFullYear() + '-' + (releaseDate.getMonth()+1) +'-'+ releaseDate.getDate()
                    console.log(formattedDate)
                    this.setState(
                        {
                            movie: {
                                id: id,
                                title: json.movie.title,
                                release_date: formattedDate,
                                runtime: json.movie.runtime,
                                mpaa_rating: json.movie.mpaa_rating,
                                rating: json.movie.rating,
                                description: json.movie.description
                            },
                            isLoaded: true,
                        },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            })
                        }
                    )
                })
        } else {
            this.setState({
                isLoaded: true
            })
        }
    }

    render() {
        let {movie, isLoaded, error} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading....</div>
        } else {
            return (
                <Fragment>
                    <h2>Add/Edit Movie</h2>
                    <Alert alertType={this.state.alert.type} alertMessage={this.state.alert.message}/>
                    <hr/>
                    <form onSubmit={this.handleSubmit}>
                        <input type="hidden" name="id" id="id" value={movie.id} onChange={this.handleChange}/>
                        <Input className={this.hasErrors("title") ? "is-invalid" : ""}
                               title={"Title"}
                               type={"text"}
                               name={"title"}
                               value={movie.title}
                               handleChange={this.handleChange}
                               errorDiv={this.hasErrors("title") ? "text-danger" : "d-none"}
                               errorMsg={"Please enter a title"}
                        />
                        <Input className={this.hasErrors("release_date") ? "is-invalid" : ""}
                               title={"Release date"}
                               type={"date"}
                               name={"release_date"}
                               value={movie.release_date}
                               handleChange={this.handleChange}
                               errorDiv={this.hasErrors("release_date") ? "text-danger" : "d-none"}
                               errorMsg={"Please enter a date"}
                        />
                        <Input className={this.hasErrors("runtime") ? "is-invalid" : ""}
                               title={"Runtime"}
                               type={"text"}
                               name={"runtime"}
                               value={movie.runtime}
                               handleChange={this.handleChange}
                               errorDiv={this.hasErrors("runtime") ? "text-danger" : "d-none"}
                               errorMsg={"Please enter a runtime"}
                        />
                        <Select className={this.hasErrors("mpaa_rating") ? "is-invalid" : ""}
                                title={"MPAA Rating"}
                                name={"mpaa_rating"}
                                options={this.state.mpaaOptions}
                                value={movie.mpaa_rating}
                                handleChange={this.handleChange}
                                placeholder={"Choose..."}
                                errorDiv={this.hasErrors("mpaa_rating") ? "text-danger" : "d-none"}
                                errorMsg={"Please select a mpaa rating"}
                        />
                        <Input className={this.hasErrors("rating") ? "is-invalid" : ""}
                               title={"Rating"} type={"text"} name={"rating"} value={movie.rating}
                               handleChange={this.handleChange}
                               errorDiv={this.hasErrors("rating") ? "text-danger" : "d-none"}
                               errorMsg={"Please enter a rating"}
                        />
                        <Textarea className={this.hasErrors("description") ? "is-invalid" : ""}
                                  title={"Description"} name={"description"} value={movie.description}
                                  handleChange={this.handleChange}
                                  errorDiv={this.hasErrors("description") ? "text-danger" : "d-none"}
                                  errorMsg={"Please enter a description"}/>
                        <hr/>
                        <button className="btn btn-primary">Save</button>
                    </form>
                </Fragment>
            )
        }
    }
}