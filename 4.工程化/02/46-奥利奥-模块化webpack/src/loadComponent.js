import React, { Component } from 'react';

export default function (loadComponent) {

  return class extends Component {
    state = {
      C: () => <>loading</>
    }
    async componentDidMount() {
      const { default: C } = await loadComponent();
      this.setState({ C });
    }
    render() {
      const C = this.state.C;
      return <C />;
    }
  }
}