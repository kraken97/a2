import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class HistoryService {
    constructor(private router: Router) {
    }

    public go(path: string) {
        console.log(path);
        this.router.navigateByUrl(path);
    }

    public goBack() {
        window.history.back();
    }
}