import React, {PureComponent} from 'react';

const withActiveItem = (Component, initialActiveItem = -1) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: initialActiveItem,
      };

      this._handlerSetActiveItem = this._handlerSetActiveItem.bind(this);
    }

    componentWillUnmount() {
      this.setState({
        activeItem: -1,
      });
    }

    _handlerSetActiveItem(index) {
      this.setState({activeItem: index});
    }

    render() {
      return (
        <Component
          {...this.props}
          activeItem={this.state.activeItem}
          setActiveItem={this._handlerSetActiveItem}
        />
      );
    }
  }
  return WithActiveItem;
};

export default withActiveItem;
