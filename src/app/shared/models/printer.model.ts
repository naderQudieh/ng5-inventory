import { Supply } from './supply.model';

export class Printer {

    constructor(
        public name: string,
        public printerId: string,
        public locations: string,
        public supplies: Supply[]
    ) {}
}
