import React, { Component, PropTypes } from 'react'

// this should be the entry point to your library
class SelectionPopover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPopover: false,
      popoverBox: {
        width: 0,
        height: 0
      },
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
    document.addEventListener('mouseup', this._handleWindowMouseUp)
  }

  componentWillUnmount() {
    const target = document.querySelectorAll('[data-selectable]')[0]
    target.removeEventListener('mouseup', this._handleMouseUp)
    document.removeEventListener('mouseup', this._handleWindowMouseUp)
  }

  render() {
    const { children, style, topOffset, ...otherProps } = this.props
    const { showPopover, selectionBox, popoverBox } = this.state
    const visibility = showPopover ? 'visible' : 'hidden'

    return (
      <div
        ref="selectionPopover"
        style={{
          visibility,
          position: 'absolute',
          top: selectionBox.top - topOffset,
          left: ((selectionBox.width / 2) - (popoverBox.width / 2)) + selectionBox.left,
          ...style
        }}
        {...otherProps}
      >
        {children}
      </div>
    )
  }

  _handleMouseUp = (e) => {
    e.stopPropagation()
    const selection = document.getSelection()
    if (selection.toString().length) {
      const selectionBox = selection.getRangeAt(0).getBoundingClientRect()
      this.setState({
        selectionBox,
        popoverBox: {
          width: this.refs.selectionPopover.getBoundingClientRect().width,
          height: this.refs.selectionPopover.getBoundingClientRect().height
        },
        showPopover: true
      })
    } else {
      this.setState({
        showPopover: false
      })
    }
  }

  _handleWindowMouseUp = () => {
    this.setState({
      showPopover: false
    })
  }
}

SelectionPopover.propTypes = {
  children: PropTypes.array.isRequired,
  style: PropTypes.object,
  topOffset: PropTypes.number
}

SelectionPopover.defaultProps = {
  topOffset: 30
}

export default SelectionPopover
