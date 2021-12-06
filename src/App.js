import React, {Component, Fragment} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Movies from "./components/Movies";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Genres from "./components/Genres";
import OneMovie from "./components/OneMovie";
import OneGenre from "./components/OneGenre";
import EditMovie from "./components/EditMovie";
import Login from "./components/Login";
import Graphql from "./components/Graphql";
import OneMovieGraphQL from "./components/OneMovieGraphQL";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: "",
    }
    this.handleJWTChange(this.handleJWTChange.bind(this))
  }

  componentDidMount() {
    let token = window.localStorage.getItem('jwt');
    if (token) {
      if (this.state.jwt === "") {
        this.setState({
          jwt: JSON.parse(token)
        })
      }
    }
  }

  handleJWTChange = (jwt) => {
    this.setState({jwt: jwt});
  }

  logout = () => {
    this.setState({jwt: ""});
    window.localStorage.removeItem("jwt")
  }
  render() {
    let loginLink;
    if (this.state.jwt === "") {
      loginLink = <Link to="/login">Login</Link>
    } else {
      loginLink = <Link to="/logout" onClick={this.logout}>Logout</Link>
    }
    return(
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
                    {this.state.jwt !== "" &&
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
                  <pre>
                    {JSON.stringify(this.state, null, 3)}
                  </pre>
                </nav>
              </div>
              <div className="col-md-10">
                <Switch>
                  <Route path="/movies/:id" component= {
                    OneMovie
                  }
                  />
                  <Route path="/moviesgraphql/:id" component= {
                    OneMovieGraphQL
                  }
                  />
                  <Route path="/movies">
                    <Movies/>
                  </Route>
                  <Route path="/genre/:id" component={OneGenre}/>
                  <Route exact path="/genres">
                    <Genres/>
                  </Route>
                  <Route exact path="/graphql">
                    <Graphql />
                  </Route>
                  <Route exact path="/login" component={
                    (props) => <Login {...props} handleJWTChange={this.handleJWTChange} />
                  } />
                  <Route path="/admin/movie/:id" component={(props) => (
                      <EditMovie {...props} jwt={this.state.jwt}/>
                  )}/>
                  <Route path="/admin" component={(props) => (
                      <Admin {...props} jwt={this.state.jwt}/>
                  )} />
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
}