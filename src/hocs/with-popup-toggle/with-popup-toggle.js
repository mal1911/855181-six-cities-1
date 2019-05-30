import React, {PureComponent} from 'react';

const withPopupToggle = (Component) => {
  class WithOpenClose extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        opened: false,
      };

      this._handlerToggle = this._handlerToggle.bind(this);
    }

    componentWillUnmount() {
      this.setState({
        opened: false,
      });
    }

    _handlerToggle() {
      this.setState({opened: !this.state.opened});
    }

    render() {
      return (
        <Component
          {...this.props}
          opened={this.state.opened}
          onToggle={this._handlerToggle}
        />
      );
    }
  }
  return WithOpenClose;
};

export default withPopupToggle;
