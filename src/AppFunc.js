import React, {Fragment, useEffect, useState} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import Graphql from "./components/Graphql";
import OneMovieGraphQL from "./components/OneMovieGraphQL";
import MoviesFunc from "./components/MoviesFunc";
import GenresFunc from "./components/GenresFunc";
import OneMovieFunc from "./components/OneMovieFunc";
import OneGenreFunc from "./components/OneGenreFunc";
import EditMovieFunc from "./components/EditMovieFunc";
import AdminFunc from "./components/AdminFunc";
import LoginFunc from "./components/LoginFunc";

export default function AppFunc(props) {
    const [jwt, setJWT] = useState("");
    useEffect(() => {
        let token = window.localStorage.getItem('jwt');
        if (token) {
            if (jwt === "") {
                setJWT(JSON.parse(token))
            }
        }
    }, [jwt]);

    function handleJWTChange(jwt) {
        setJWT(jwt);
    }

    function logout() {
        setJWT("");
        window.localStorage.removeItem("jwt")
    }

    let loginLink;
    if (jwt === "") {
        loginLink = <Link to="/login">Login</Link>
    } else {
        loginLink = <Link to="/logout" onClick={logout}>Logout</Link>
    }

    return (
        <Router>
            <div className="container">
                <div className="row">
                    <div className="col mt-3">
                        <h1 className="mt-3">
                            ReactGo movies!
                        </h1>
                    </div>
                    <div className="col mt-3 text-end">
                        {loginLink}
                    </div>
                    <hr className="mb-3"/>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <nav>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to="/movies">Movies</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to="/genres">Genres</Link>
                                </li>
                                {jwt !== "" &&
                                    <Fragment>
                                        <li className="list-group-item">
                                            <Link to="/admin/movie/0">Add movie</Link>
                                        </li>
                                        <li className="list-group-item">
                                            <Link to="/admin">Manage Catalog</Link>
                                        </li>
                                    </Fragment>
                                }
                                <li className="list-group-item">
                                    <Link to="/graphql">GraphQL</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-md-10">
                        <Switch>
                            <Route path="/movies/:id" component={
                                OneMovieFunc
                            }
                            />
                            <Route path="/moviesgraphql/:id" component={
                                OneMovieGraphQL
                            }
                            />
                            <Route path="/movies">
                                <MoviesFunc/>
                            </Route>
                            <Route path="/genre/:id" component={OneGenreFunc}/>
                            <Route exact path="/genres">
                                <GenresFunc/>
                            </Route>
                            <Route exact path="/graphql">
                                <Graphql/>
                            </Route>
                            <Route exact path="/login" component={
                                (props) => <LoginFunc {...props} handleJWTChange={handleJWTChange}/>
                            }/>
                            <Route path="/admin/movie/:id" component={(props) => (
                                <EditMovieFunc {...props} jwt={jwt}/>
                            )}/>
                            <Route path="/admin" component={(props) => (
                                <AdminFunc {...props} jwt={jwt}/>
                            )}/>
                            <Route path="/">
                                <Home/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}