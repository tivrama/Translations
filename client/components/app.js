import React, { Component } from 'react';



class App extends Component {
  render () {
    return (
      <div className="wrapper">
        { this.props.children }
      </div>
    );
  }
}

