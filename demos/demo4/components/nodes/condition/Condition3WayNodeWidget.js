import React from 'react';
import * as RJD from '../../../../../src/main';
import { Condition3WayNodeModel } from './Condition3WayNodeModel';

export class Condition3WayNodeWidget extends React.Component {
  static defaultProps = {
    node: null,
    color: 'rgb(224, 98, 20)'
  };

  onRemove() {
    const { node, diagramEngine } = this.props;
    node.remove();
    diagramEngine.forceUpdate();
  }

  getInPort() {
    const { node, color, displayOnly } = this.props;
    let inputNode = node;

    if (displayOnly) {
      inputNode = new Condition3WayNodeModel(node.name, color);
    }

    return inputNode.getInPort ? <RJD.DefaultPortLabel model={inputNode.getInPort()} key='in-port' /> : null;
  }

  getOutPort() {
    const { node, color, displayOnly } = this.props;
    let outputNode = node;

    if (displayOnly) {
      outputNode = new Condition3WayNodeModel(node.name, color);
    }
    return (
      <div className="threePorts">
        <RJD.DefaultPortLabel model={outputNode.getOutPort(1)} key='out-port1' />
        <RJD.DefaultPortLabel model={outputNode.getOutPort(2)} key='out-port2' />
        <RJD.DefaultPortLabel model={outputNode.getOutPort(3)} key='out-port3' />
      </div>
    );
    //return outputNode.getOutPort ? <RJD.DefaultPortLabel model={outputNode.getOutPort()} key='out-port' /> : null;
  }

  render() {
    const { node, displayOnly, color: displayColor } = this.props;
    const { name, color, content='\{ CONDITION \? YES \: NO \}' } = node;
    const style = {};
    if (color || displayColor) {
      style.background = color || displayColor;
    }

    return (
      <div className='basic-node' style={style}>
        <div className='title'>
          <div className='name'>
            {name}
          </div>
          {!displayOnly ? <div className='fa fa-close' onClick={this.onRemove.bind(this)} /> : null}
        </div>
        <div className="content">
          <p className="content">
            {content}
          </p>
        </div>
        <div className='ports'>
          <div className='in'>
            {this.getInPort()}
          </div>
          <div className='out labelButtons'>
            {this.getOutPort()}
          </div>
        </div>
      </div>
    );
  }
}

export const Condition3WayNodeWidgetFactory = React.createFactory(Condition3WayNodeWidget);
