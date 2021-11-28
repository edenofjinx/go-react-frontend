import React, {Component, Fragment} from "react";
import Input from "./form_components/input";
import Textarea from "./form_components/textarea";
import Select from "./form_components/select";
import "./EditMovie.css";

export default class EditMovie extends Component {
    state = {
        movie: {},
        isLoaded: false,
        error: null,
    }

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
            error: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (event) => {
        console.log("form was submitted");
        event.preventDefault();
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

    componentDidMount() {
        
    }

    render() {
        let {movie} = this.state;
        return (
            <Fragment>
                <h2>Add/Edit Movie</h2>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    <input type="hidden" name="id" id="id" value={movie.id} onChange={this.handleChange}/>
                    <Input title={"Title"} type={"text"} name={"title"} value={movie.title} handleChange={this.handleChange} />
                    <Input title={"Release date"} type={"date"} name={"release_date"} value={movie.release_date} handleChange={this.handleChange} />
                    <Input title={"Runtime"} type={"text"} name={"runtime"} value={movie.runtime} handleChange={this.handleChange} />
                    {/*<div className="mb-3">*/}
                    {/*    <label htmlFor="mpaa_rating" className="form-label">MPAA Rating</label>*/}
                    {/*    <select name="mpaa_rating" id="mpaa_rating" className="form-select" value={movie.mpaa_rating} onChange={this.handleChange}>*/}
                    {/*        <option value="" className="form-select">Choose...</option>*/}
                    {/*        <option value="G" className="form-select">G</option>*/}
                    {/*        <option value="PG" className="form-select">PG</option>*/}
                    {/*        <option value="PG13" className="form-select">PG13</option>*/}
                    {/*        <option value="R" className="form-select">R</option>*/}
                    {/*        <option value="NC17" className="form-select">NC17</option>*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                    <Select
                        title={"MPAA Rating"}
                        name={"mpaa_rating"}
                        options={this.state.mpaaOptions}
                        value={movie.mpaa_rating}
                        handleChange={this.handleChange}
                        placeholder={"Choose..."}
                    />
                    <Input title={"Rating"} type={"text"} name={"rating"} value={movie.rating} handleChange={this.handleChange} />
                    <Textarea title={"Description"} name={"description"} value={movie.description} handleChange={this.handleChange} />
                    <hr/>
                    <button className="btn btn-primary">Save</button>
                </form>
                <div className="mt-3">
                    <pre>
                        {JSON.stringify(this.state, null, 3)}
                    </pre>
                </div>
            </Fragment>
        )
    }
}