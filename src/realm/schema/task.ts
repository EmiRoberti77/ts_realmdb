import { ObjectSchema } from 'realm';

export class Task extends Realm.Object<Task> {
  _id!: string;
  name!: string;
  status?: boolean;

  static schema: ObjectSchema = {
    name: 'Task',
    properties: {
      _id: 'string',
      name: 'string',
      status: 'bool',
    },
  };
}
