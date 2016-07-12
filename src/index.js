import React, { Component, PropTypes } from 'react'

// this should be the entry point to your library
class SelectionPopover extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

SelectionPopover.propTypes = {
  children: PropTypes.object
}

export default SelectionPopover
