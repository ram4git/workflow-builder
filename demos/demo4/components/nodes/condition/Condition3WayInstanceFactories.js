import * as RJD from '../../../../../src/main';
import { Condition3WayNodeModel } from './Condition3WayNodeModel';

export class Condition3WayNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('Condition3WayNodeModel');
  }

  getInstance() {
    return new Condition3WayNodeModel();
  }
}
