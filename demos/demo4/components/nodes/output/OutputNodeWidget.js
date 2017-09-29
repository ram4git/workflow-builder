import React from 'react';
import * as RJD from '../../../../../src/main';
import { OutputNodeModel } from './OutputNodeModel';

export class OutputNodeWidget extends React.Component {
  static defaultProps = {
    node: null,
    color: '#1abc9c'
  };

  onRemove() {
    const { node, diagramEngine } = this.props;
    node.remove();
    diagramEngine.forceUpdate();
  }

  getOutPorts() {
    const { node, color, displayOnly } = this.props;
    let outputNode = node;

    if (displayOnly) {
      outputNode = new OutputNodeModel(node.name, color);
    }

    return outputNode.getOutPorts ? outputNode.getOutPorts().map((port, i) => (
      <RJD.DefaultPortLabel model={port} key={`out-port-${i}`} />
    )) : [];
  }

  render() {
    const { node, displayOnly, color: displayColor, className } = this.props;
    const { name, color } = node;
    const style = {};
    if (color || displayColor) {
      style.background = color || displayColor;
    }

    return (
      <div className={`basic-node ${className}`} style={style}>
        <div className='title'>
          <div className='name'>
            {name}
          </div>
          {!displayOnly ? <div className='fa fa-close' onClick={this.onRemove.bind(this)} /> : null}
        </div>
        <div className='ports'>
          <div className='out'>
            {this.getOutPorts()}
          </div>
        </div>
      </div>
    );
  }
}

export const OutputNodeWidgetFactory = React.createFactory(OutputNodeWidget);
