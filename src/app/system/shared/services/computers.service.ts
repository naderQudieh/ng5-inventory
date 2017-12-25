import {Injectable} from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database-deprecated";
import {Computer} from "../../../shared/models/computer.model";

@Injectable()
export class ComputersService {

  computers: FirebaseListObservable<Computer[]>;

  constructor(public db: AngularFireDatabase) {
      // this.computers = this.db.list('/computers');
    this.computers = this.db.list('/computers', {
      query: {
        orderByChild: 'employeeName',
      }
    });
  }

  getComputers(): FirebaseListObservable<Computer[]> {
      return this.computers;
  }

  getNotebooks() {
      return this.computers
        .map(computers => {
          const notebooks = computers.filter(c => c.type === 'laptop');
          return notebooks;
        });
}

  addComputer(computer: Computer) {
    return this.computers.push(computer);
  }

  updateComputer(key: string, computer: Computer) {
    return this.computers.update(key, computer);
  }

  deleteComputer(key: string) {
    return this.computers.remove(key);
  }

}

