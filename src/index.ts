import { RealmDB } from './realm/db/realmdb';
import { ITask } from './realm/models/models';

const data = new Date();
const task: ITask = {
  _id: data.toISOString(),
  name: `task-${data.getHours()}-${data.getMinutes()}-${data.getSeconds()}`,
  status: false,
};

const db = new RealmDB();

db.openDB().then((success) => {
  db.write(task);
  console.log('added tasks');
  const tasks = db.getAllByStatus(false);
  console.log(tasks);
});
