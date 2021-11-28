import React, {Component, Fragment} from "react";
import "./EditMovie.css";

export default class EditMovie extends Component {
    state = {
        movie: {},
        isLoaded: false,
        error: null,
    }

    componentDidMount() {
        this.setState({
            movie: {
                title: "Some money problems",
                mpaa_rating: "R",
                description: "long as description"
            }
        });
    }

    render() {
        let {movie} = this.state;
        return (
            <Fragment>
                <h2>Add/Edit Movie</h2>
                <hr/>
                <form action="" method="post">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={movie.title}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="release_date" className="form-label">Release date</label>
                        <input type="text" className="form-control" id="release_date" name="release_date" value={movie.release_date}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="runtime" className="form-label">Runtime</label>
                        <input type="text" className="form-control" id="runtime" name="runtime" value={movie.runtime}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mpaa_rating" className="form-label">MPAA Rating</label>
                        <select name="mpaa_rating" id="mpaa_rating" className="form-select" value={movie.mpaa_rating}>
                            <option value="" className="form-select">Choose...</option>
                            <option value="G" className="form-select">G</option>
                            <option value="PG" className="form-select">PG</option>
                            <option value="PG13" className="form-select">PG13</option>
                            <option value="R" className="form-select">R</option>
                            <option value="NC17" className="form-select">NC17</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">Rating</label>
                        <input type="text" className="form-control" id="rating" name="rating" value={movie.rating}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">Rating</label>
                        <input type="text" className="form-control" id="rating" name="rating" value={movie.rating}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea name="description" id="description" cols="30" rows="3" className="form-control" value={movie.description} />
                    </div>
                    <hr/>
                    <button className="btn btn-primary">Save</button>
                </form>
            </Fragment>
        )
    }
}