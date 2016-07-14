(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["react-selection-popover"] = factory(require("react"));
	else
		root["react-selection-popover"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function clearSelection() {
	  if (window.getSelection) {
	    window.getSelection().removeAllRanges();
	  } else if (document.selection) {
	    document.selection.empty();
	  }
	}
	
	// this should be the entry point to your library
	
	var SelectionPopover = function (_Component) {
	  _inherits(SelectionPopover, _Component);
	
	  function SelectionPopover(props) {
	    _classCallCheck(this, SelectionPopover);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SelectionPopover).call(this, props));
	
	    _this._handlePopoverClick = function () {
	      var showPopover = false;
	      _this.setState({ showPopover: showPopover });
	      if (_this.props.onChange) {
	        _this.props.onChange({ showPopover: showPopover });
	      }
	      clearSelection();
	    };
	
	    _this._handleMouseUp = function (e) {
	      e.stopPropagation();
	      var selection = document.getSelection();
	      if (selection.toString().length) {
	        (function () {
	          var selectionBox = selection.getRangeAt(0).getBoundingClientRect();
	          var targetBox = document.querySelector('[data-selectable]').getBoundingClientRect();
	
	          var showPopover = true;
	          if (_this.props.onChange) {
	            _this.props.onChange({ showPopover: showPopover });
	          }
	
	          // Nest setState so display property is set to inline-block before retrieving width and height of popover
	          _this.setState({
	            showPopover: showPopover
	          }, function () {
	            var popoverBox = _this.refs.selectionPopover.getBoundingClientRect();
	            _this.setState({
	              popoverBox: {
	                top: selectionBox.top - targetBox.top - _this.props.topOffset,
	                left: selectionBox.width / 2 - popoverBox.width / 2 + (selectionBox.left - targetBox.left)
	              }
	            });
	          });
	        })();
	      } else {
	        var _showPopover = false;
	        _this.setState({ showPopover: _showPopover });
	        if (_this.props.onChange) {
	          _this.props.onChange({ showPopover: _showPopover });
	        }
	      }
	    };
	
	    _this._handleWindowMouseUp = function () {
	      var showPopover = false;
	      _this.setState({ showPopover: showPopover });
	      if (_this.props.onChange) {
	        _this.props.onChange({ showPopover: showPopover });
	      }
	    };
	
	    _this.state = {
	      showPopover: false,
	      popoverBox: {
	        top: 0,
	        left: 0
	      }
	    };
	    return _this;
	  }
	
	  _createClass(SelectionPopover, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var target = document.querySelector('[data-selectable]');
	      target.addEventListener('mouseup', this._handleMouseUp);
	      document.addEventListener('mouseup', this._handleWindowMouseUp);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var target = document.querySelector('[data-selectable]');
	      target.removeEventListener('mouseup', this._handleMouseUp);
	      document.removeEventListener('mouseup', this._handleWindowMouseUp);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var children = _props.children;
	      var style = _props.style;
	      var topOffset = _props.topOffset;
	
	      var otherProps = _objectWithoutProperties(_props, ['children', 'style', 'topOffset']); // eslint-disable-line no-unused-vars
	
	
	      var _state = this.state;
	      var showPopover = _state.showPopover;
	      var popoverBox = _state.popoverBox;
	      var top = popoverBox.top;
	      var left = popoverBox.left;
	
	      var visibility = showPopover ? 'visible' : 'hidden';
	      var display = showPopover ? 'inline-block' : 'none';
	
	      return _react2.default.createElement(
	        'div',
	        _extends({
	          ref: 'selectionPopover',
	          style: _extends({
	            visibility: visibility,
	            display: display,
	            position: 'absolute',
	            top: top,
	            left: left
	          }, style)
	        }, otherProps, {
	          onClick: this._handlePopoverClick
	        }),
	        children
	      );
	    }
	  }]);
	
	  return SelectionPopover;
	}(_react.Component);
	
	SelectionPopover.propTypes = {
	  children: _react.PropTypes.node.isRequired,
	  style: _react.PropTypes.object,
	  topOffset: _react.PropTypes.number,
	  onChange: _react.PropTypes.func
	};
	
	SelectionPopover.defaultProps = {
	  topOffset: 30
	};
	
	exports.default = SelectionPopover;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-selection-popover.js.map