import { Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Variables } from './../../constants';
import { User } from './../../models/user';
import { Role } from './../../models/role';
import { OnInit } from '@angular/core';
import { AlertService } from './../../services/alert-service.service';
import { HistoryService } from './../../services/history.service';
import { UrlService } from './../../services/url.service';
import { ViewModel } from './../../model-based-module/ViewModel';
import { UserView } from './../../model-based-module/userView';
import { RoleView } from './../../model-based-module/rolesView';
export abstract class BaseGenericComponent implements OnInit {


    abstract formType;
    /**
     *name of component if not spesified get this data from route data 
     */
    @Input() entityName;

    /**
     *full path for http requests
     */
    entityPath: string;

    /**
     * viewModel used to get  edit/create forms list and views  list
     */
    viewModel: ViewModel;

    /**
     * entity obj used when dynamic  form emmit value
      */
    entity;

    /**
     *list of questions for forms;
     */
    questions;

    /**
     *server errors 
     */
    errors;

    /**
     * default props for entity
     * if your want set demoId  and name for new entity or entity from server  pass [defaultProps]= "{demoId:5,name:'kek'}"
     *DEPRECATED
     * /
    //@Input() defaultProps = {};

    /**
     * this function is called before sending entity to server;
     * use for mapping value to something special
     */
    protected beforeSend: (entity) => any = (e) => e;



    constructor(
        protected http: Http,
        protected router: Router,
        protected actRoute: ActivatedRoute,
        protected alertService: AlertService,
        protected history: HistoryService,
        protected urlService: UrlService) { }




    public goBack() {
        this.history.goBack();
        return false;
    }
    /**
     * is invoked  by commonSubmit;
     */
    abstract onSubmit(value): Observable<any>;
    /**
     * get list of inputs for dynamic forms
     * @param name   name of entity
     * @param apiPath path where you will make requests to get entities 
     * is used by edit form
     */
    abstract getElements(name, apiPath): Observable<any>;

    public commonSubmit(value) {
        try {
            let editedValue = this.beforeSend(value);
            let res = this.onSubmit(editedValue);
            res.subscribe(r => {
                setTimeout(() => {
                    this.alertService.success('Success', 'Your data is saved to server');
                });
                this.goBack();
            }, error => {
                this.errors = error._body || error;
                this.alertService.error('Server error', error);
            });

        } catch (error) {
            this.errors = error._body || error;
            this.alertService.error('Server error', error);

        }

    }
    afterInit() { }

    ngOnInit() {
        try {
            if (this.entityName) {
                this.entityPath = Variables.baseApiPath + '/' + this.entityName;
                this.getElements(this.entityName, this.entityPath).subscribe(r => {
                    this.questions = r;
                    this.afterInit();

                });
            } else {
                this.actRoute.data
                    .flatMap(r => {
                        console.log(r);
                        this.entityName = r['data'];
                        this.entityPath = Variables.baseApiPath + '/' + r['data'];
                        return this.getElements(this.entityName, this.entityPath);
                    })
                    .subscribe(r => {
                        this.questions = r;
                        this.afterInit();
                    }, e => {
                        this.alertService.error('server error', e);
                        throw e;
                    });

            }
        } catch (e) {
            this.alertService.error('server error', e);
            throw e;
        }
    }
    /**
     * init view model  which is based on entityName ;
     */

    getViewModel(entityName, entity?: any): Observable<ViewModel> {
        let localViewModel;
        switch (entityName) {
            case 'users':
                this.beforeSend = value => {
                    let newObject = JSON.parse(JSON.stringify(value));
                    let roles = {};
                    newObject.roles.forEach(r => {
                        let resobj: any = {};
                        roles[r.value] = r.selected;
                    });
                    newObject.roles = roles;
                    return newObject;
                };
                return this.http.get(Variables.rolesApiRoute).map(r => r.json()).map(roles => {
                    let rolesList = roles.data.map(r => r.name);
                    localViewModel = new UserView(entity || User.createEmpty(), rolesList);
                    return localViewModel;
                });
            case 'roles':
                this.beforeSend = (entity) => {
                    let resObj = { id: entity.id, name: entity.name, permissions: {} };
                    Variables.entities.forEach(entName => {
                        entity[entName].forEach(p => {
                            resObj.permissions[p.value + ' ' + entName] = p.selected;
                        });
                    });
                    return resObj;
                };
                localViewModel = new RoleView(entity || Role.createEmpty());
                break;
            default:
                localViewModel = null;
                break;
        }
        return Observable.of(localViewModel);
    }

    /**
     * get list of questions from View model
     * @param entity if not specified  will create new empty class and pass it to viewModel constructor
     */
    get(sectionType, entityName, entity?: any): Observable<Array<any>> {
        let res = this.getViewModel(entityName, entity);
        return res.map(result => {
            this.viewModel = result;
            console.log(result);
            switch (sectionType) {
                case 'create':
                    return this.viewModel.createInputCreateList();
                case 'edit':
                    return this.viewModel.createInputEditList();

            }
        });

    }
}
