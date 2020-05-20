export class PersonModel {
  id: string;

  age: number;

  email: string;

  gender: string;

  name: string;

  constructor() {}

  public absentPrimaryKeys(newEntity?: boolean): Array<string> {
    let absents: Array<string> = new Array<string>();
    if (
      this.id === null ||
      this.id === undefined ||
      this.id.trim().length === 0
    ) {
      absents.push('id');
    }

    return absents;
  }

  public static factory(source: any): PersonModel {
    let target = new PersonModel();
    if (source !== null && source !== undefined) {
      if (source.id !== undefined) target.id = source.id;
      if (source.name !== undefined) target.name = source.name;
      if (source.age !== undefined) target.age = source.age;
      if (source.gender !== undefined) target.gender = source.gender;
      if (source.email !== undefined) target.email = source.email;
    }
    return target;
  }
}
