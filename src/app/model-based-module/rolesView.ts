import {
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

import { Variables } from './../constants';
import { Role } from '../models/role';
import { TablePermissions } from './../models/tablePermissions';
import { CheckboxGroup } from './control-type-models/checkbox-group';
import { TextboxQuestion } from './control-type-models/textbox-input';

export class RoleView {
    id: TextboxQuestion;
    roleName: TextboxQuestion;
    data: Array<CheckboxGroup>;

    constructor(role: Role) {
        this.id = new TextboxQuestion({
            key: 'id',
            label: 'id',
            value: role.id,
            hidden: true,
            order: 0
        })
        this.data = new Array<CheckboxGroup>();
        for (let i = 0; i < Variables.entities.length; i++) {
            let entity = role[Variables.entities[i]]
            let data = new CheckboxGroup({
                key: Variables.entities[i],
                label: Variables.entities[i],
                value: [
                    { selected: entity && entity[0] ? entity[0].selected : false, value: 'create' },
                    { selected: entity && entity[1] ? entity[1].selected : false, value: 'update' },
                    { selected: entity && entity[2] ? entity[2].selected : false, value: 'remove' },
                    { selected: entity && entity[3] ? entity[3].selected : false, value: 'view' }
                ],
                required: true,
                order: 1
            });
            this.data.push(data);
        }

        this.roleName = new TextboxQuestion({
            key: 'name',
            label: 'name',
            validators: [Validators.minLength(5)],
            value: role.name,
            required: true,
            order: 2
        })


    }

    createInputEditList() {
        return [this.id, this.roleName, ...this.data];
    }
    createInputCreateList() {
        return [this.id, this.roleName, ...this.data];
    }
    createViewElementsList() {
        return [];
    }

}