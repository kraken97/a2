import {
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

import { User } from '../models/user';
import { ReflectiveInjector, Inject } from '@angular/core';
import { Http, ConnectionBackend } from '@angular/http';
import { ViewModel } from './ViewModel';
import { TextboxQuestion } from './control-type-models/textbox-input';
import { CheckboxGroup } from './control-type-models/checkbox-group';

export class UserView implements ViewModel {
    id: TextboxQuestion;
    userName: TextboxQuestion;
    password: TextboxQuestion;
    email: TextboxQuestion;
    roles: CheckboxGroup;
    constructor(user: User, rolesList: Array<any>) {
        console.log(rolesList);
        this.id = new TextboxQuestion({
            key: 'id',
            label: 'id',
            value: user.id,
            hidden: true,
            order: 0
        })
        this.userName = new TextboxQuestion({
            key: 'userName',
            label: 'userName',
            validators: [Validators.minLength(2), Validators.required],
            value: user.userName,
            order: 1
        })
        this.password = new TextboxQuestion({
            key: 'password',
            label: 'Password',
            validators: [Validators.minLength(2), Validators.required],
            type: 'password',
            value: user.password,
            order: 2
        })
        this.email = new TextboxQuestion({
            key: 'email',
            type: 'email',
            validators: [Validators.minLength(5), Validators.required],
            label: 'Email',
            value: user.email,
            order: 3
        });

        let roles = [];
        let keys = Object.keys(user.roles);
        rolesList.forEach((r, i) => {
            roles.push({ selected: keys.indexOf(r) !== -1, value: r })
        })
        this.roles = new CheckboxGroup({
            key: 'roles',
            label: 'roles',
            value: Array.from(roles),
            required: true,
            order: 4
        })
    }
    createInputEditList() {
        return [this.id, this.userName, this.email, this.roles];
    }
    createInputCreateList() {
        return [this.userName, this.email, this.password, this.roles];
    }
    createViewElementsList() {
        return [];
    }

}