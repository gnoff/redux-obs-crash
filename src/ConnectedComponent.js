import React, { Component } from 'react'
import { connect } from 'react-redux'

class ConnectedComponent extends Component {
  fireAction = () => {
    this.props.dispatch({ type: 'AN_ACTION', value: Math.random() })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.action.tick === 5)
      throw new Error('uh oh something went wrong when receiving new props')
  }

  render () {
    return (
      <div>
        <p>ConnectedComponent</p>
        <p>{JSON.stringify(this.props.action)}</p>
        <button onClick={this.fireAction}>Fire Action</button>
        <p>We Expect to see `SUCCESS_ACTION`s that contain a tick value incrementing each second </p>
        <p>Once we get to 5, we get an unhandled exception even though there are catch statements on every Observable</p>
        <p>If you hit `fire action` before tick 5 you delay the error since the timer observable is replaced with a new one. once the error is thrown however additional dispatches from `fire action` are ignored</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    action: state.myReducer.action,
  }
}

export default connect(mapStateToProps)(ConnectedComponent)
