import React from "react";
import {BrowserRouter as Router, Link, Route, Switch, useParams, useRouteMatch} from "react-router-dom";
import Movies from "./components/Movies";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Categories from "./components/Categories";
import OneMovie from "./components/OneMovie";

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
                    <Link to="/categories">Categories</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/admin">Manage Catalog</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-md-10">
              <Switch>
                <Route path="/movies/:id" component={OneMovie} />
                <Route path="/movies">
                  <Movies />
                </Route>
                <Route exact path="/categories">
                  <CategoryPage />
                </Route>
                <Route exact path="/categories/drama"
                       render={(props) => <Categories {...props} title={`Drama`} />} />
                <Route exact path="/categories/comedy"
                       render={(props) => <Categories {...props} title={`Comedy`} />} />
                <Route exact path="/categories/action"
                       render={(props) => <Categories {...props} title={`Action`} />} />
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


function CategoryPage() {
  let {path, url} = useRouteMatch();

  return (
      <div>
        <h2>Categories</h2>
        <ul>
          <li><Link to={`${path}/drama`}>Drama</Link></li>
          <li><Link to={`${path}/comedy`}>Comedy</Link></li>
          <li><Link to={`${path}/action`}>Action</Link></li>
        </ul>
      </div>
  );
}

export default App;
