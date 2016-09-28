'use strict';

var React = require('react');
var classnames = require('classnames');

var ChildButton = React.createClass({

  handleOnClick: function handleOnClick() {
    if(this.props.disabled === true)
    {
      return;
    }

    this.props.onClick();
  },

  handleOnKeyDown: function handleOnKeyDown(evt) {
    if (this.props.disabled === true) {
      return;
    }

    if (evt.key === "Enter" || evt.key === " ") {
      evt.preventDefault();
      this.props.callBackParent("TOGGLE_MENU");
      this.props.onKeyDown(evt, this.props.label);
    } else if (evt.key === "ArrowUp") {
      this.props.callBackParent("CHILD_ARROW_UP");
    } else if (evt.key === "ArrowDown") {
      this.props.callBackParent("CHILD_ARROW_DOWN");
    } else if (evt.key === "Tab" || evt.key === "Escape") {
      evt.preventDefault();
      this.props.callBackParent("FOCUS_MAIN");
    }
  },

  onFocus: function onFocus() {
    this.props.callBackParent('CHILD_FOCUS');
  },

  render: function(){
    var iconClass = classnames('mfb-component__child-icon', this.props.icon);
    var className = classnames('mfb-component__button--child',
                               this.props.className,
                               {"mfb-component__button--disabled": this.props.disabled});
    return (
      <li>
        <a href={this.props.href}
           id={this.props.id}
           data-mfb-label={this.props.label}
           onClick={this.handleOnClick}
           className={className}
           onKeyDown={this.handleOnKeyDown}
           data-focusable={this.props.focus}
           onFocus={this.onFocus}>
          <i className={iconClass}></i>
        </a>
      </li>
    );
  }
});

module.exports = ChildButton;
