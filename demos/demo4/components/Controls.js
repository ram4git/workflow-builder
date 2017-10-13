import React from 'react';
import InputNodeEditWidget from './nodes/input/InputNodeEditWidget'

export class Controls extends React.Component {
  render() {
    const { model, selectedNode, onUndo, onRedo, canUndo, canRedo, updateModel, onSave } = this.props;
    // let content = selectedNode ? JSON.stringify(selectedNode.serialize(), null, 2) : '';
    //
    // if (selectedNode) {
    //   if (selectedNode.nodeType === 'output') {
    //     content = <InputNodeEditWidget node={selectedNode} updateModel={updateModel} model={model}/>;
    //   }
    // }

    // <pre>
    //   {content}
    // </pre>
    return (
      <div className='controls'>
        <div className="buttonGroup">
          <button onClick={onUndo} disabled={!canUndo} className="fa fa-reply" aria-hidden="true"></button>
          <button onClick={onRedo} disabled={!canRedo} className="fa fa-share" aria-hidden="true"></button>
          <button onClick={onSave} disabled={!canUndo} className="fa fa-save" aria-hidden="true"></button>
        </div>
    </div>
    );
  }
}
