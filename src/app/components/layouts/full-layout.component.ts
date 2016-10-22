import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StashService } from '../../services/stash.service';
import { AccountService } from './../../services/account.service';
import { HistoryService } from './../../services/history.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

    public disabled: boolean = false;
    public status: { isopen: boolean } = { isopen: false };
    private rights: any = {};
    constructor(
        private stashService: StashService,
        private account: AccountService,
        private route: ActivatedRoute,
        private history: HistoryService
    ) { }

    ngOnInit(): void {}

}