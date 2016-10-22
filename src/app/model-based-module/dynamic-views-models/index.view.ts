import { BaseView } from './base-view';
export class IndexView extends BaseView {
    viewType: string = 'index';
    parentId: number;
    compareProperty: string;
    api: string;
    title: string;
    properties: Array<string>;
    constructor(options) {
        super(options);
        this.parentId = options.parentId;
        this.compareProperty = options.compareProperty;
        this.api = options.api;
        this.title = options.title;
        this.properties = options.properties;
    }
}