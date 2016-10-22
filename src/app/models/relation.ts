export class Relation {
    constructor(
        public relatedApi: string,
        // property which we compare
        public compareProperty: string,
        // property of related object to which is compared `compareProperty`
        public relatedProperty: string,
        // property which should be obtained from db
        public displayProperty: string,
        // property which is desplayed as the heading of column
        public title = displayProperty
    ) { }
}