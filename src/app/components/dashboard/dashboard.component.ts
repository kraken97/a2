import { Component, OnInit,ElementRef } from '@angular/core';
@Component({
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    constructor(public ref:ElementRef) { }

    ngOnInit() {
        console.log("kek");
        console.log(this.ref);
    }
    onclick() {
        let res = JSON.stringify(this.ref.nativeElement.style.backgroundColor="black");
        console.log(res);
    }
    
}
