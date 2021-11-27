import React, {Component, Fragment} from "react";
import {BrowserRouter as Router, Link, Route, Switch, useParams} from "react-router-dom";
import Movies from "./components/Movies";
import Admin from "./components/Admin";
import Home from "./components/Home";

function App() {
  return (
      <Router>
        <div className="container">
          <div className="row">
            <h1 className="mt-3">
              ReactGo movies!
            </h1>
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
                    <Link to="/admin">Manage Catalog</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-md-10">
              <Switch>
                <Route path="/movies/:id">
                  <Movie />
                </Route>
                <Route path="/movies">
                  <Movies />
                </Route>
                <Route path="/admin">
                  <Admin />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
  );
}

function Movie() {
  let {id} = useParams();
  return <h2>Movie id {id}</h2>
}

export default App;
