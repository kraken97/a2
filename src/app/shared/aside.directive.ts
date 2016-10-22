import { Directive, HostListener } from '@angular/core';

/**
* Allows the aside to be toggled via click.
*/
@Directive({
    selector: '.aside-toggle',
})
export class AsideToggleDirective {
    constructor() { }

    @HostListener('click', ['$event'])
    toggleOpen($event: any) {
        $event.preventDefault();
        document.querySelector('App').classList.toggle('aside-menu-open');
    }
}
