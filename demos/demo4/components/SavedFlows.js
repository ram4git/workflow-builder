import React from 'react';
import { diagramEngine } from './Engine';
import * as firebase from 'firebase';

export class SavedFlows extends React.Component {

  constructor(props) {
    super(props);
    this.data = {
      dbRef: firebase.database().ref(),
    }

    this.state = {
      workflows: {}
    };
  }

  componentDidMount() {
    const ref = this.data.dbRef;
    ref.on('value', snapshot => {
      // console.log('CDM', JSON.stringify(snapshot.val(), null, 2));
      const { workflows } = snapshot.val();
      this.setState({
        workflows: workflows || {}
      });
    });
  }


  render() {
    console.log('STATE', JSON.stringify(this.state, null, 2));

    return (
      <div className="savedFlows">
        { this.renderWorkFlowBox() }
      </div>
    );
  }

  renderWorkFlowBox() {
    const workflowArray = [];
    const { workflows } = this.state;
    console.log(JSON.stringify(workflows, null, 2));
    Object.keys(workflows).forEach(index => {
      workflowArray.push(
        <div key={index}><button className="workFlow" onClick={ this.onSelectSavedWorkFlowClick.bind(this,workflows[index]) }>{index} </button></div>
      );
    });
    return workflowArray;
  }

  onSelectSavedWorkFlowClick(workflow) {
    console.log('CLICKED', JSON.stringify(workflow, null, 2));
    this.props.onSelectSavedWorkFlow(workflow);
  }


}
