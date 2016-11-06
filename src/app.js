import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, Router, Route} from 'react-router';
import "./app.css";
import "font-awesome/css/font-awesome.css";
import App from "./containers/App/App";

const Home = React.createClass({
  render () {
    return (
      <div>I am Home</div>
    )
  }
});

const routes = (
  <Router>
    <Route path="/" component={Home}/>
  </Router>
);

const mountNode = document.querySelector("#root");
ReactDOM.render(<App history={browserHistory} routes={routes}/>, mountNode);
