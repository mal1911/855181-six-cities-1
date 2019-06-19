import React, {PureComponent} from 'react';
import {ESC_KEYCODE} from "../../constants";

const withPopupToggle = (Component, opened = false) => {
  class WithOpenClose extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        opened,
      };

      this._handleToggle = this._handleToggle.bind(this);
      this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    componentWillUnmount() {
      this.setState({
        opened: false,
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          opened={this.state.opened}
          onToggle={this._handleToggle}
        />
      );
    }

    _handleToggle() {
      if (!this.state.opened) {
        document.addEventListener(`keydown`, this._handleKeyDown);
      } else {
        document.removeEventListener(`keydown`, this._handleKeyDown);
      }
      this.setState({opened: !this.state.opened});
    }

    _handleKeyDown(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        this._handleToggle();
      }
    }
  }
  return WithOpenClose;
};

export default withPopupToggle;
