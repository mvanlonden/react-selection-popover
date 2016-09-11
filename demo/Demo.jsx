import React from 'react';
import SelectionPopover from '../src'

export default class Demo extends React.Component {
  state = {
    showPopover: false,
    hasLiked: false
  }

  render() {
    return (
      <div style={{
        position: 'relative'
      }}>
        <div data-selectable>
          <p>
            This is the first selectable paragraph. Looking pretty good.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <SelectionPopover
          onDeselect={this._handleDeselect}
          onSelect={this._handleSelect}
          showPopover={this.state.showPopover}
        >
          <button onClick={this._handleLikeButton}>{this.state.hasLiked ? 'dislike' : 'like'}</button>
          <button onClick={this._handleCloseButton}>close</button>
        </SelectionPopover>
        {this.state.showPopover ? (
          <div>
            <p>
              current selection: <q> {this.state.selectedText} </q>
            </p>
          </div>
        ) :  false}
      </div>
    )
  }

  _handleSelect = () => {
    this.setState({
      showPopover: true,
      selectedText: window.getSelection().toString()
    })
  }

  _handleDeselect = () => {
    this.setState({
      showPopover: false
    })
  }

  _handleCloseButton = () => {
    this.setState({
      showPopover: false,
      hasLiked: false
    })
  }

  _handleLikeButton = () => {
    this.setState({
      hasLiked: !this.state.hasLiked
    })
  }
}
