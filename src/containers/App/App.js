import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import styles from './styles.module.css';

class App extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired
  }

  get content(){
      return (
        <Router
          routes={this.props.routes}
          history={this.props.history}
        />
      )
  }
  render() {
    return (
      <div style={{height: "100%"}} className={styles.wrapper}>
        {this.content}
      </div>
    );
  }
}

module.exports = App;
