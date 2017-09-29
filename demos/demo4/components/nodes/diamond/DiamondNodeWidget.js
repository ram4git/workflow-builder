import * as React from 'react';
import * as SRD from '../../../../../src/main';
import { DiamondNodeModel } from './DiamondNodeModel';


export class DiamonNodeWidget extends React.Component  {
  static defaultProps = {
    size:150,
    node: null
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
      inputNode = new DiamondNodeModel(node.name, color);
    }

    return inputNode.getInPort ? <SRD.DefaultPortLabel model={inputNode.getInPort()} key='in-port' /> : null;
  }

  getOutPort() {
    const { node, color, displayOnly } = this.props;
    let outputNode = node;

    if (displayOnly) {
      outputNode = new DiamondNodeModel(node.name, color);
    }

    return outputNode.getOutPort ? <SRD.DefaultPortLabel model={outputNode.getOutPort()} key='out-port' /> : null;
  }


  render() {
    return (
      React.DOM.div({className: "diamond-node", style: {position: 'relative', width: this.props.size, height: this.props.size}},
        React.DOM.svg({
          width:this.props.size,height: this.props.size,dangerouslySetInnerHTML: {__html:`
            <g id="Layer_1">
            </g>
            <g id="Layer_2">
              <polygon fill="cyan" stroke="#000000" stroke-width="3" stroke-miterlimit="10" points="10,`+(this.props.size/2)+` `+(this.props.size/2)+`,10 `+(this.props.size-10)+`,`+(this.props.size/2)+` `+(this.props.size/2)+`,`+(this.props.size-10)+` "/>
            </g>
        `}}),

        // left node
        React.DOM.div({
          style: {
            position: 'absolute',
            zIndex: 10,
            top: this.props.size / 2 - 5
          }
        },
          React.createElement(SRD.PortWidget,{name: 'left', node: this.props.node})
        ),

        // top node
        React.DOM.div({
          style: {
            position: 'absolute',
            zIndex: 10,
            left: this.props.size / 2 - 8
          }
        },
          React.createElement(SRD.PortWidget,{name: 'top', node: this.props.node})
        ),

        // right
        React.DOM.div({
          style: {
            position: 'absolute',
            zIndex: 10,
            left: this.props.size - 10,
            top: this.props.size / 2
          }
        },
          React.createElement(SRD.PortWidget,{name: 'right', node: this.props.node})
        ),

        // bottom
        React.DOM.div({
          style: {
            position: 'absolute',
            zIndex: 10,
            left: this.props.size / 2 - 8,
            top: this.props.size - 10
          }
        },
          React.createElement(SRD.PortWidget,{name: 'bottom', node: this.props.node})
        )
      )
    );
  }
}

export const DiamonNodeWidgetFactory = React.createFactory(DiamonNodeWidget);
