import React, { Component, PropTypes } from 'react'

// this should be the entry point to your library
class SelectionPopover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPopover: true,
      popoverWidth: 0,
      selectionBox: {
        top: 0,
        left: 0,
        width: 0
      }
    }
  }

  componentDidMount() {
    const target = document.querySelectorAll('[data-selectable]')[0]
    target.addEventListener('mouseup', this._handleMouseUp)
  }

  componentWillUnmount() {
    const target = document.querySelectorAll('[data-selectable]')[0]
    target.removeEventListener('mouseup', this._handleMouseUp)
  }

  render() {
    const { children, style, ...otherProps } = this.props
    const { showPopover, selectionBox, popoverWidth } = this.state
    const { top, left, width } = selectionBox
    return (
      <div
        ref="selectionPopover"
        style={{
          visibility: showPopover ? 'visibile' : 'hidden',
          position: 'fixed',
          top: top - 40,
          left: ((width / 2) - (popoverWidth / 2)) + left,
          ...style
        }}
        {...otherProps}
      >
        {children}
      </div>
    )
  }

  _handleMouseUp = () => {
    const selection = document.getSelection()
    if (selection.toString().length) {
      const selectionBox = selection.getRangeAt(0).getBoundingClientRect()
      this.setState({
        selectionBox,
        popoverWidth: this.refs.selectionPopover.getBoundingClientRect().width,
        showPopover: true
      })
    }

  }
}

SelectionPopover.propTypes = {
  children: PropTypes.array.isRequired,
  style: PropTypes.object
}

export default SelectionPopover
