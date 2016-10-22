import { Injectable } from '@angular/core';
import { ApiService } from './api-service.service';

@Injectable()
export class AccountService {
    public rights;
    constructor(private apiService: ApiService) {
        this.getRoles();
    }

    private getRoles() {
        this.apiService.getClear('users/permissions').subscribe(
            x => {
                console.log(x);
                this.rights = x.json();
            }
        );

    }
}