import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import "./app.css";

const App = React.createClass({
  render () {
    return (
      <div className={styles.wrapper}>
        <h1>Hello World!</h1>
        <p>You are in {__NODE_ENV__} environment</p>
      </div>
    )
  }
})

const mountNode = document.querySelector("#root");
ReactDOM.render(<App/>, mountNode);
