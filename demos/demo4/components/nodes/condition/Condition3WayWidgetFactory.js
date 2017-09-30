import * as RJD from '../../../../../src/main';
import { Condition3WayNodeWidgetFactory } from './Condition3WayNodeWidget';

export class Condition3WayWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('condition3way');
  }

  generateReactWidget(diagramEngine, node) {
    return Condition3WayNodeWidgetFactory({ node });
  }
}
