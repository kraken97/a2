import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Variables } from './../constants';

@Injectable()
export class UrlService {

    constructor(private router: Router) { }
    /**
     * Get id of view
     * Type string is used due to ID of users and roles.
     */
    getId(view:string): string {
        let url = this.router.url;
        let part = url.substring(url.indexOf(view) + view.length + 1, url.length);
        let slash = part.indexOf('/');
        let last = slash === -1 ? part.length : slash;
        return part.substring(0, last);
    }
    /**
     * Get url of edit page based on component and id.
     */
    getEditUrl(api: string, id:number): string {
        console.log(api, id);
        switch (api) {
            case 'users':
                return `/${Variables.basePathWithoutHost}/users/edit/${id}`
            case 'roles':
                return `/${Variables.basePathWithoutHost}/roles/edit/${id}`
            default:
                return '';
        }
    }
    /**
     * Get url to list component based on current url.
     */
    getViewUrl(view: string, getId = true): string {
        let id;
        switch (view) {
            case 'users':
                return `/${Variables.basePathWithoutHost}/users`
            case 'roles':
                return `/${Variables.basePathWithoutHost}/roles`
            default:
                return '';
        }
    }
    getCreateUrl(view: string):string {
        switch (view) {
            case 'users':
                return `/${Variables.basePathWithoutHost}/users/create`
            case 'roles':
                return `/${Variables.basePathWithoutHost}/roles/create`
            default:
                return '';
        }
    }
}