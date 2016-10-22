import { TablePermissions } from './tablePermissions';
export class Role {
    constructor(
        public id: string,
        public name: string,
        public permissions: Array<TablePermissions>) {
    }
    static createEmpty() {
        return new Role("", "", []);
    }
}