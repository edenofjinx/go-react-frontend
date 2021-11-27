import React, {Component, Fragment} from "react";

export default class Movies extends Component {

    state = {movies: []};

    componentDidMount() {
        this.setState({
            movies: [
                {id: 1, title: "Titanic", runtime: 142},
                {id: 2, title: "The fight club", runtime: 125},
                {id: 3, title: "The matrix", runtime: 118}
            ]
        })
    }

    render() {
        return (
            <Fragment>
                <h2>Movie homepage</h2>
                <ul>
                    {this.state.movies.map( (m) => (
                        <li key={m.id}>
                            {m.title}
                        </li>
                    ))}
                </ul>
            </Fragment>
        );
    }
}