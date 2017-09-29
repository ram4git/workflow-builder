import * as RJD from '../../../../../src/main';
import { ConditionNodeModel } from './ConditionNodeModel';

export class ConditionNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('ConditionNodeModel');
  }

  getInstance() {
    return new ConditionNodeModel();
  }
}
