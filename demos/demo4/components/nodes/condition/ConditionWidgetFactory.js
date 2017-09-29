import * as RJD from '../../../../../src/main';
import { ConditionNodeWidgetFactory } from './ConditionNodeWidget';

export class ConditionWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('condition');
  }

  generateReactWidget(diagramEngine, node) {
    return ConditionNodeWidgetFactory({ node });
  }
}
