export class TablePermissions {


    constructor(
        public name: string,
        public create: boolean,
        public update: boolean,
        public view: boolean,
        public remove: boolean
    ) {
    }


    static createEmpty(name: string) {
        return new TablePermissions(name, false, false, false, false);
    }


}