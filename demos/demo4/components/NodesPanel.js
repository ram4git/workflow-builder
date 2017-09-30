import React from 'react';
import { DragWrapper } from './DragWrapper';
import { OutputNodeWidget } from './nodes/output/OutputNodeWidget';
import { InputNodeWidget } from './nodes/input/InputNodeWidget';
import { ConnectionNodeWidget } from './nodes/connection/ConnectionNodeWidget';
import { ConditionNodeWidget } from './nodes/condition/ConditionNodeWidget';
import { Condition3WayNodeWidget } from './nodes/condition/Condition3WayNodeWidget';


class Node extends React.Component {
  renderNode() {
    const { type, color, className, name } = this.props;

    if (type === 'output') {
      return <OutputNodeWidget node={{ name }} displayOnly className={className} />;
    }
    if (type === 'input') {
      return <InputNodeWidget node={{ name }} displayOnly className={className} />;
    }
    if (type === 'connection') {
      return <ConnectionNodeWidget node={{ name }} color={color} displayOnly className={className} />;
    }
    if (type === 'condition') {
      return <ConditionNodeWidget node={{ name }} color={color} displayOnly className={className} />;
    }
    if (type === 'condition3way') {
      return <Condition3WayNodeWidget node={{ name }} color={color} displayOnly className={className} />;
    }
    console.warn('Unknown node type');
    return null;
  }

  render() {
    const { type, color } = this.props;

    return (
      <DragWrapper type={type} color={color} style={{ display: 'inline-block' }}>
        {this.renderNode()}
      </DragWrapper>
    );
  }
}

export class NodesPanel extends React.Component {
  render() {
    return (
      <div className='nodes-panel'>
        <div className='node-wrapper'>
          <Node type='output' className="start" name="start" color="rgb(26, 188, 156, 0.3)"/>
        </div>
        <div className='node-wrapper'>
          <Node type='input' className="stop" name="stop" color="#c0392b"/>
        </div>
        <div className='node-wrapper'>
          <Node type='output' className="output" name="begin" color="#1abc9c"/>
        </div>
        <div className='node-wrapper'>
          <Node type='connection' color="#2980b9" name="connector"/>
        </div>
        <div className='node-wrapper'>
          <Node type='condition' className="diamond" name="CONDITION" color="#95a5a6"/>
        </div>
        <div className='node-wrapper'>
          <Node type='condition3way' className="diamond" name="3 WAY CONDITION" color="#95a5a6"/>
        </div>
        <div className='node-wrapper'>
          <Node type='input' className="input" name="end" color="#c0392b"/>
        </div>
      </div>
    );
  }
}
