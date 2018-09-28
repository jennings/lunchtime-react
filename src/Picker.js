import React, {Component} from 'react';

class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handlePick() {
    this.setState({picked: this._pickRandomDestination()});
  }

  _pickRandomDestination() {
    const {dest} = this.props.destinations
      .map(dest => ({dest, sort: Math.random()}))
      .reduce((winner, next) => (winner.sort > next.sort ? winner : next));
    return dest;
  }

  render() {
    if (!this.props.destinations || !this.props.destinations.length) {
      return <div />;
    }

    return (
      <div>
        <button onClick={() => this.handlePick()}>Pick</button>{' '}
        {(this.state.picked && this.state.picked.name) || '\xA0'}
      </div>
    );
  }
}

export default Picker;
