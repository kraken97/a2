export namespace Variables {
    export const protocol = 'http://';
    export const host = protocol + "localhost:4040";
    export const fileUpload = protocol + host + '/api/screenshot/upload';
    export const api = 'api';
    export const baseApiPath = protocol + '/' + host + '/' + api;
    export const basePathWithoutHost = 'admin';
    export const basePath = protocol + '/' + host + '/' + 'admin' + '/';
    export const entities: Array<string> = ['users', 'roles'];
    export const screenshot = 'screenshots';
    export const usersApiRoute = protocol + host + '/' + api + '/' + 'users';
    export const rolesApiRoute = protocol + host + '/' + api + '/' + 'roles';
    export const modelControlTypes = {

    }
}
