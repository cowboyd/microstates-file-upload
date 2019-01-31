import { Component } from 'react';

import { Store, create, valueOf } from 'microstates';

export default class StoreComponent extends Component {
  constructor(props) {
    super(props);
    let { type, value, onChange = x => x } = props;
    this.store = Store(create(type, value), next => {
      this.store = next;
      this.setState(valueOf(next))
      onChange(next);
    });
  }

  render() {
    return this.props.children(this.store);
  }
}
