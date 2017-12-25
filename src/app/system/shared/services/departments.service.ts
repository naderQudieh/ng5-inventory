import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {Department} from '../../../shared/models/department.model';

@Injectable()
export class DepartmentsService {

  departments: FirebaseListObservable<Department[]>;

  constructor(public db: AngularFireDatabase) {
    this.departments = this.db.list('/departments', {
      query: {
        orderByChild: 'name',
      }
    });
  }

  getDepartments(): FirebaseListObservable<Department[]> {
    return this.departments;
  }

  addDepartment(department: Department) {
    return this.departments.push(department);
  }

  updateDepartment(key: string, department: Department) {
    return this.departments.update(key, department);
  }

  deleteDepartment(key: string) {
    return this.departments.remove(key);
  }

}
