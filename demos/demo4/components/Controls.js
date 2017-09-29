import React from 'react';

export class Controls extends React.Component {
  render() {
    const { selectedNode, onUndo, onRedo, canUndo, canRedo } = this.props;
    const content = selectedNode ? JSON.stringify(selectedNode.serialize(), null, 2) : '';

  	return (
  	  <div className='controls'>
  	    <div className="bottonGroup">
  	      <button onClick={onUndo} disabled={!canUndo}  className="fa fa-reply" aria-hidden="true"></button>
  	      <button onClick={onRedo} disabled={!canRedo} className="fa fa-share" aria-hidden="true"></button>
  	    </div>
  	    <pre>
  	      {content}
  	    </pre>
    	</div>
  	);
  }
}
