import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import * as firebase from 'firebase';
import { diagramEngine } from './components/Engine';
import * as RJD from '../../src/main';


import * as actions from './actions';
import { NodesPanel } from './components/NodesPanel';
import { Diagram } from './components/Diagram';
import { Controls } from './components/Controls';
import { SavedFlows } from './components/SavedFlows';

import './demo4.scss';

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      model: props.model
    };
  }

  render() {
    const { selectedNode, onNodeSelected, updateModel, onUndo, onRedo, canUndo, canRedo } = this.props;
    const { model } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Workflow Builder</h1>
        </header>
        <DragDropContextProvider backend={HTML5Backend}>
          <div className='parent-container'>
            <NodesPanel />
            <Diagram
              model={model}
              updateModel={updateModel}
              onNodeSelected={onNodeSelected}
            />
            <Controls
              model={model}
              selectedNode={selectedNode}
              updateModel={updateModel}
              onUndo={onUndo}
              onRedo={onRedo}
              onSave={this.onSave.bind(this)}
              canUndo={canUndo}
              canRedo={canRedo}
            />
          <SavedFlows onSelectSavedWorkFlow={ this.restoreSavedWorkFlow.bind(this) }/>
          </div>
        </DragDropContextProvider>
      </div>
    );
  }

  onSave() {
    const { model } = this.props;
    const postRef = firebase.database().ref('workflows').push();
    const diagramModel = new RJD.DiagramModel();
    diagramModel.deSerializeDiagram(model, diagramEngine);
    const str = diagramModel.serializeDiagram();

    postRef.set(str)
    .then((str) => {
      alert('SAVE SUCCESSFUL');
    })
    .catch((err) => {
      alert('SAVE FAILED');
    });
  }

  restoreSavedWorkFlow(modelToRestore) {
    this.setState({
      model: modelToRestore
    });
  }
}

const mapStateToProps = state => ({
  selectedNode: state.history.present.selectedNode,
  model: state.history.present.model,
  canUndo: state.history.past.length > 0,
  canRedo: state.history.future.length > 0
});

const mapDispatchToProps = dispatch => ({
  onNodeSelected: node => dispatch(actions.onNodeSelected(node)),
  updateModel: (model, props) => dispatch(actions.updateModel(model, props)),
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(UndoActionCreators.redo())
});

export const Demo4 = connect(mapStateToProps, mapDispatchToProps)(Demo);
