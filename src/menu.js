'use strict';

var React = require('react');

var getClasses = require('./utils/get-classes');
var getChildren = require('./utils/get-children');
var childrenValidator = require('./utils/children-validator');

var Menu = React.createClass({

  propTypes: {
    effect: React.PropTypes.oneOf(['zoomin', 'slidein', 'slidein-spring', 'fountain']).isRequired,
    position: React.PropTypes.oneOf(['tl', 'tr', 'bl', 'br']).isRequired,
    children: childrenValidator
  },

  getInitialState: function() {
    return {
      isOpen: false
    };
  },

  toggleMenu: function(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    if(this.props.method === 'hover'){
      return;
    }
    // flip the state from open to close and viceversa
    this.setState({
      isOpen: !this.state.isOpen
    });
  },

  childChanged: function childChanged(action, key) {
    var childButtons = getChildren(this.props.children).child;

    if (action === "TOGGLE_MENU") {
      this.setState({
        isOpen: !this.state.isOpen
      });
    } else if (action === "CLOSE_MENU") {
      if (this.state.isOpen) {
        this.setState({
          isOpen: false
        });
      }
    } else if (action === "MAIN_ARROW_UP") {
      if (childButtons.length > 0) {
        var ele = document.getElementById(childButtons[0].props.id);
        ele.focus();
        this.setState({
          focused: 0
        });
      }
    } else if (action === "CHILD_ARROW_UP") {
      if (childButtons.length > 1 && (this.state.focused < childButtons.length - 1)) {
        var nextItem = parseInt(this.state.focused) + 1;
        var ele = document.getElementById(childButtons[nextItem].props.id);
        ele.focus();
        this.setState({
          focused: nextItem
        });
      } else if (this.state.focused == childButtons.length - 1) {
        var ele = document.getElementById(childButtons[0].props.id);
        ele.focus();
        this.setState({
          focused: 0
        });
      }
    } else if (action === "CHILD_ARROW_DOWN") {
      if (this.state.focused == 0 ) {
        var nextItem = childButtons.length - 1;
        var ele = document.getElementById(childButtons[nextItem].props.id);
        ele.focus();
        this.setState({
          focused: nextItem
        });
      } else {
        var nextItem = parseInt(this.state.focused) - 1;
        var ele = document.getElementById(childButtons[nextItem].props.id);
        ele.focus();
        this.setState({
          focused: nextItem
        });
      }
    } else if (action === "FOCUS_MAIN") {
        if (this.state.isOpen) {
          this.setState({
            isOpen: false
          });
        }
        var ele = document.getElementById('mfb-main-button');
        ele.focus();
        this.setState({
          focused: 0
        });
    } else if (action === "CHILD_FOCUS") {
      if (!this.state.isOpen) {
        var ele = document.getElementById('mfb-main-button');
        ele.focus();
        this.setState({
          focused: 0
        });
      }
    }
  },

  render: function() {
    var classes = getClasses(this.props);
    var buttons = getChildren(this.props.children);

    var main = buttons.main && React.cloneElement(buttons.main, {
      onClick: this.toggleMenu,
      callBackParent: this.childChanged
    });

    var childButtons = [];
    var that = this;
    for (var i = 0; i < buttons.child.length; i++) {
      var child = React.cloneElement(buttons.child[i], {
        key: i,
        callBackParent: that.childChanged
      });
      childButtons.push(child);
    }

    return (
      <ul className={classes}
          data-mfb-toggle={this.props.method}
          data-mfb-state={this.state.isOpen ? 'open' : 'closed'}>
        <li className="mfb-component__wrap">
          {main}
          <ul className="mfb-component__list">
            {childButtons}
          </ul>
        </li>
      </ul>
    );
  }
});

module.exports = Menu;
