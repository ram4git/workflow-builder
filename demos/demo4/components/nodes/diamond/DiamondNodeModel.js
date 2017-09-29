import * as SRD from '../../../../../src/main';
import { DiamondPortModel } from './DiamondPortModel';

export class DiamondNodeModel extends SRD.NodeModel {
  constructor(name = 'Diamond', color = 'rgb(224, 98, 20)') {
    super('diamond');
    this.addPort(new DiamondPortModel('top'));
    this.addPort(new DiamondPortModel('left'));
    this.addPort(new DiamondPortModel('bottom'));
    this.addPort(new DiamondPortModel('right'));
    this.name = name;
    this.color = color;
  }

  deSerialize(object) {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color,
    });
  }

  getInPort() {
    return this.ports.input;
  }

  getOutPort() {
    return this.ports.output;
  }
}
