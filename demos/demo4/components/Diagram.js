import React from 'react';
import _ from 'lodash';
import { DropTarget } from 'react-dnd';
import * as RJD from '../../../src/main';
import { OutputNodeModel } from './nodes/output/OutputNodeModel';
import { InputNodeModel } from './nodes/input/InputNodeModel';
import { ConnectionNodeModel } from './nodes/connection/ConnectionNodeModel';
import { ConditionNodeModel } from './nodes/condition/ConditionNodeModel';
import { Condition3WayNodeModel } from './nodes/condition/Condition3WayNodeModel';

//import { DiamondNodeModel } from './nodes/diamond/DiamondNodeModel';

import { diagramEngine } from './Engine';

// Setup the diagram model
let diagramModel = new RJD.DiagramModel();

const nodesTarget = {
  drop(props, monitor, component) {
    const { x: pageX, y: pageY } = monitor.getSourceClientOffset();
    const { left = 0, top = 0 } = diagramEngine.canvas.getBoundingClientRect();
    const { offsetX, offsetY } = diagramEngine.diagramModel;
    const x = pageX - left - offsetX;
    const y = pageY - top - offsetY;
    const item = monitor.getItem();

    let newNode;
    if (item.type === 'output') {
      const { node } = monitor.getItem().children.props;
      newNode = new OutputNodeModel(node.name);
    }
    if (item.type === 'input') {
      const { node } = monitor.getItem().children.props;
      newNode = new InputNodeModel(node.name);
    }
    if (item.type === 'connection') {
      const { node } = monitor.getItem().children.props;
      newNode = new ConnectionNodeModel(node.name, item.color);
    }
    if (item.type === 'condition') {
      const { node } = monitor.getItem().children.props;
      newNode = new ConditionNodeModel(node.name, item.color);
    }
    if (item.type === 'condition3way') {
      const { node } = monitor.getItem().children.props;
      newNode = new Condition3WayNodeModel(node.name, item.color);
    }

    newNode.x = x;
    newNode.y = y;
    diagramModel.addNode(newNode);
    props.updateModel(diagramModel.serializeDiagram());
  },
};

@DropTarget('node-source', nodesTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))


export class Diagram extends React.Component {
  componentDidMount() {
    const { model } = this.props;
    if (model) {
      this.setModel(model);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.model, nextProps.model)) {
      this.setModel(nextProps.model);
    }
  }

  setModel(model) {
    diagramModel = new RJD.DiagramModel();
    if (model) {
      diagramModel.deSerializeDiagram(model, diagramEngine);
    }
	  diagramEngine.setDiagramModel(diagramModel);
  }

  onChange(model, action) {
    console.log('ON DIAGRAM CHANGE');
    console.log(action);

    // Ignore some events
    if (['items-copied'].indexOf(action.type) !== -1) {
      return;
    }

    // Check for single selected items
    if (['node-selected', 'node-moved'].indexOf(action.type) !== -1) {
      return this.props.updateModel(model, { selectedNode: action.model });
    }

    // Check for canvas events
    const deselectEvts = ['canvas-click', 'canvas-drag', 'items-selected', 'items-drag-selected', 'items-moved'];
    if (deselectEvts.indexOf(action.type) !== -1) {
      return this.props.updateModel(model, { selectedNode: null });
    }

    // Check if this is a deselection and a single node exists
    const isDeselect = ['node-deselected', 'link-deselected'].indexOf(action.type) !== -1;
    if (isDeselect && action.items.length < 1 && action.model.nodeType) {
      return this.props.updateModel(model, { selectedNode: action.model });
    }

    this.props.updateModel(model);
  }

  render() {
    const { connectDropTarget } = this.props;

    // Render the canvas
    return connectDropTarget (
      <div className='diagram-drop-container'>
        <RJD.DiagramWidget diagramEngine={diagramEngine} onChange={this.onChange.bind(this)} />
      </div>
    );
  }
}
