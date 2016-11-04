import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import "./app.css";

const App = React.createClass({
  render () {
    return (
      <div className={styles.wrapper}>Hello World!</div>
    )
  }
})

const mountNode = document.querySelector("#root");
ReactDOM.render(<App/>, mountNode);
