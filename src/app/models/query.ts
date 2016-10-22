export class Query {
    constructor(
        public start: number,
        public end: number,
        public sort = 'ASC',
        public order = 'id',
        public filter = ''
    )
    { }
    public toString(): string {
        return `?_sort=${this.sort}&_order=${this.order}&_start=${this.start}&_end=${this.end}&_query=${this.filter}`;
    }
}
