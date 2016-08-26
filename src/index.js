import React, { Component, PropTypes } from 'react'
import onClickOutside from 'react-onclickoutside'

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
      popoverBox: {
        top: 0,
        left: 0
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.showPopover === true && nextProps.showPopover === false) {
      clearSelection()
    }
  }

  componentDidMount() {
    const target = document.querySelector('[data-selectable]')
    target.addEventListener('mouseup', this._handleMouseUp)
  }

  componentWillUnmount() {
    const target = document.querySelector('[data-selectable]')
    target.removeEventListener('mouseup', this._handleMouseUp)
  }

  render() {
    const { onTextDeselect, onTextSelect, showPopover, children, style, topOffset, ...otherProps } = this.props // eslint-disable-line no-unused-vars
    const { popoverBox: { top, left  } } = this.state

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
      >
        {children}
      </div>
    )
  }

  _handleMouseUp = () => {
    const selection = document.getSelection()
    if (!selection.toString().trim().length > 0) {
      this.props.onTextDeselect()
    } else {
      this.props.onTextSelect(selection.toString())
      this.computePopoverBox()
    }
  }

  computePopoverBox = () => {
    const selection = document.getSelection()
    const selectionBox = selection.getRangeAt(0).getBoundingClientRect()
    const popoverBox = this.refs.selectionPopover.getBoundingClientRect()
    const targetBox = document.querySelector('[data-selectable]').getBoundingClientRect()
    this.setState({
      popoverBox: {
        top: (selectionBox.top - targetBox.top) - this.props.topOffset,
        left: selectionBox.width / 2 - popoverBox.width / 2 + (selectionBox.left - targetBox.left)
      }
    })
  }

  handleClickOutside = () => {
    this.props.onTextDeselect()
  }
}

SelectionPopover.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  topOffset: PropTypes.number,
  onTextDeselect: PropTypes.func.isRequired,
  onTextSelect: PropTypes.func.isRequired,
  showPopover: PropTypes.bool.isRequired
}

SelectionPopover.defaultProps = {
  topOffset: 30
}

export default onClickOutside(SelectionPopover)
