import React from 'react';
import { InputNodeModel } from './InputNodeModel';
import _ from 'lodash';


export default class InputNodeEditWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'begin'
    };
  }

  render() {
    const { node, updateModel } = this.props;
    return (
      <div>
        <h1>EDIT BEGIN</h1>
        <div>
          <label>TITLE</label>
          <input placeholder='begin' onChange={ this.onChangeValue.bind(this, 'name')}/>
        </div>
        <div>
          <label>DESCRIPTION</label>
          <input placeholder='begin' onChange={ this.onChangeValue.bind(this, 'desc')}/>
        </div>
        <div>
          <label>COLOR</label>
          <input placeholder='begin' onChange={ this.onChangeValue.bind(this, 'color')}/>
        </div>
      </div>
    );
  }

  onChangeValue(field, e) {
    const value = e.target.value;
    const { model, node } = this.props;
    this.setState({
      [field]: value
    });

    const selectedNode = _.filter(model.nodes, { id: node.id })[0];
    if (selectedNode) {
      console.log('NODE EXISTS');
      selectedNode[field] = value;
    }

    node[field] = value ;
    console.log('UPDATED NODE', JSON.stringify(node.serialize(), null, 2));
    this.props.updateModel(model, { selectedNode: node });
  }
}
