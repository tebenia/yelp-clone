import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';

const App = React.createClass({
  render () {
    return (
      <div className={styles.wrapper}>
        <h1>Hello World!</h1>
        <p>You are in {__NODE_ENV__} environment</p>
        <i className="fa fa-star"></i>
      </div>
    )
  }
});

module.exports = App;
