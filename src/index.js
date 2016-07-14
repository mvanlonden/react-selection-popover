import React, { Component, PropTypes } from 'react'

function clearSelection() {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }
}

// this should be the entry point to your library
class SelectionPopover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPopover: false,
      popoverBox: {
        top: 0,
        left: 0
      }
    }
  }

  componentDidMount() {
    const target = document.querySelector('[data-selectable]')
    target.addEventListener('mouseup', this._handleMouseUp)
    document.addEventListener('mouseup', this._handleWindowMouseUp)
  }

  componentWillUnmount() {
    const target = document.querySelector('[data-selectable]')
    target.removeEventListener('mouseup', this._handleMouseUp)
    document.removeEventListener('mouseup', this._handleWindowMouseUp)
  }

  render() {
    const { children, style, topOffset, ...otherProps } = this.props // eslint-disable-line no-unused-vars
    const { showPopover, popoverBox } = this.state
    const { top, left } = popoverBox
    const visibility = showPopover ? 'visible' : 'hidden'
    const display = showPopover ? 'inline-block' : 'none'

    return (
      <div
        ref="selectionPopover"
        style={{
          visibility,
          display,
          position: 'absolute',
          top,
          left,
          ...style
        }}
        {...otherProps}
        onClick={this._handlePopoverClick}
      >
        {children}
      </div>
    )
  }

  _handlePopoverClick = () => {
    const showPopover = false
    this.setState({showPopover})
    if (this.props.onChange) {
      this.props.onChange({showPopover})
    }
    clearSelection()
  }

  _handleMouseUp = (e) => {
    e.stopPropagation()
    const selection = document.getSelection()
    if (selection.toString().length) {
      const selectionBox = selection.getRangeAt(0).getBoundingClientRect()
      const targetBox = document.querySelector('[data-selectable]').getBoundingClientRect()

      const showPopover = true
      if (this.props.onChange) {
        this.props.onChange({showPopover})
      }

      // Nest setState so display property is set to inline-block before retrieving width and height of popover
      this.setState({
        showPopover
      }, () => {
        const popoverBox = this.refs.selectionPopover.getBoundingClientRect()
        this.setState({
          popoverBox: {
            top: (selectionBox.top - targetBox.top) - this.props.topOffset,
            left: selectionBox.width / 2 - popoverBox.width / 2 + (selectionBox.left - targetBox.left)
          }
        })
      })
    } else {
      const showPopover = false
      this.setState({showPopover})
      if (this.props.onChange) {
        this.props.onChange({showPopover})
      }
    }
  }

  _handleWindowMouseUp = () => {
    const showPopover = false
    this.setState({showPopover})
    if (this.props.onChange) {
      this.props.onChange({showPopover})
    }
  }
}

SelectionPopover.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  topOffset: PropTypes.number,
  onChange: PropTypes.func
}

SelectionPopover.defaultProps = {
  topOffset: 30
}

export default SelectionPopover
