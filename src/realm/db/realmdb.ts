import dotenv from 'dotenv';
import Realm, { ObjectSchema, Results } from 'realm';
import { Task } from '../schema/task';
import { ITask } from '../models/models';

dotenv.config({
  path: '.env.local',
});

export class RealmDB {
  private dbName: string | undefined;
  private realmdb: Realm | undefined;
  private key: string | undefined;

  constructor() {
    this.dbName = process.env.DB_NAME;
    this.key = process.env.KEY;
  }

  private createKeyArrayBuffer(): ArrayBuffer {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(this.key);
    return encoded.buffer;
  }

  public async openDB(): Promise<any> {
    this.realmdb = await Realm.open({
      path: this.dbName,
      schema: [Task],
      encryptionKey: this.createKeyArrayBuffer(),
    });

    console.log(`${this.dbName} opened`);
  }

  public write(newTask: ITask): boolean {
    if (!this.realmdb) return false;

    try {
      this.realmdb.write(() => {
        this.realmdb?.create(Task, newTask);
      });
    } catch (err: any) {
      console.error(err.message);
      return false;
    }

    return true;
  }

  public getAllByStatus(status: boolean) {
    const allTasks = this.realmdb?.objects(Task);
    const filteredTasks = allTasks?.filtered('status == $0', status);
    return filteredTasks;
  }

  public close(): boolean {
    if (!this.realmdb) return false;
    try {
      this.realmdb.close();
    } catch (err: any) {
      console.log(err.message);
      return false;
    }
    return true;
  }
}
