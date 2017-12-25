import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {Printer} from '../../../shared/models/printer.model';

@Injectable()
export class PrintersService {

    printers: FirebaseListObservable<Printer[]>;

    constructor(public db: AngularFireDatabase) {
        this.printers = this.db.list('/printers', {
            query: {
                orderByChild: 'name',
            }
        });
    }

    getPrinters(): FirebaseListObservable<Printer[]> {
        return this.printers;
    }

    addPrinter(printer: Printer) {
        return this.printers.push(printer);
    }

    updatePrinter(key: string, printer: Printer) {
        return this.printers.update(key, printer);
    }

    deletePrinter(key: string) {
        return this.printers.remove(key);
    }

}
