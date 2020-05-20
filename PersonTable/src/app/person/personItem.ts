import { PersonModel } from './person.model';

export class PersonItem {
  public entity: PersonModel;

  public constructor(product: PersonModel) {
    this.entity = PersonModel.factory(product);
  }

  public static factory(source: any) {
    let target = new PersonItem(new PersonModel());
    target.entity = PersonModel.factory(source ? source.entity : null);
    return target;
  }
}
