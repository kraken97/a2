import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ToastyModule } from 'ng2-toasty';
import { ReactiveFormsModule } from '@angular/forms';
import { DND_PROVIDERS, DND_DIRECTIVES } from 'ng2-dnd';
import { Ng2PaginationModule } from 'ng2-pagination';
import { ModalModule } from 'ng2-modal';
import { DatePicker } from 'ng2-datepicker/ng2-datepicker';

import { ColorPickerService, ColorPickerDirective } from 'angular2-color-picker';


import { AppComponent } from './app.component';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';
import { routing } from './app.routing';

// Layouts
import { FullLayoutComponent } from './components/layouts/full-layout.component';

// Main view
import { ApiService } from './services/api-service.service';
import { AlertService } from './services/alert-service.service';
import { ScreenshotComponent } from './components/screenshot/screenshot.component';

import { p404Component } from './components/pages/404.component';
import { p500Component } from './components/pages/500.component';
import { RegisterComponent } from './components/pages/register.component';

import { StashService } from './services/stash.service';


import { InputToggleComponent } from './components/input/toggle/input-toggle.component';
import { InputFileComponent } from './components/screenshot/input-file.component';




import { InputSelectComponent } from './components/input/select/input-select.component';

import { InputRadioComponent } from './components/input/radio/input-radio.component';
import { ImageListComponent } from './components/image-list/image-list.component';
import { InputDateComponent } from './components/input/date/input-date.component';
import { InputColorComponent } from './components/input/color/input-color.component';
import { InputTextComponent } from './components/input/text/input-text.component';
import { AccountService } from './services/account.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';


import { GenericEditComponent } from './components/generic/generic-edit.component';
import { GenericCreateComponent } from './components/generic/generic-create.component';
import { ErrorToStringPipe } from './services/errorToString';
import { HistoryService } from './services/history.service';
import { UrlService } from './services/url.service';

import { GenericIndexComponent } from './components/generic/generic-index.compoment';
import { CheckboxComponent } from './model-based-module/components/checkbox-group/checkbox-group';
import { FormComponent } from './model-based-module/components/form/form.component';
import { DynamicFormQuestionComponent } from './model-based-module/components/form/dynamic-input.component';
import { DatePickerComponent } from './model-based-module/components/model-datepicker/model-datepicker';
import { ModelInputImageComponent } from './model-based-module/components/model-input-image/model-input-image';
import { ViewComponent } from './model-based-module/formView/view-element.component';
import { DynamicViewComponent } from './model-based-module/formView/dynamic-view.component';
import { QuestionControlService } from './model-based-module/question-control.service';

import { RoleListComponent } from './admin/roles/role-list/role-list.component';
import { UserListComponent } from './admin/user/user-list/user-list.component';
// for hot module replace
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';


@NgModule({
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    Ng2PaginationModule,
    ModalModule,
    ToastyModule.forRoot(),
    ReactiveFormsModule

  ],
  declarations: [
    UserListComponent,
    RoleListComponent,
    DynamicViewComponent,
    ViewComponent,
    ErrorToStringPipe,
    ModelInputImageComponent,
    DatePickerComponent,
    GenericCreateComponent,
    GenericEditComponent,
    CheckboxComponent,
    FormComponent,
    DynamicFormQuestionComponent,
    AppComponent,
    FullLayoutComponent,
    p404Component,
    p500Component,
    RegisterComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    ScreenshotComponent,
    DND_DIRECTIVES,
    InputTextComponent,
    InputToggleComponent,
    InputFileComponent,
    InputSelectComponent,
    InputRadioComponent,
    DatePicker,
    ImageListComponent,
    ColorPickerDirective,
    InputDateComponent,
    InputColorComponent,
    DashboardComponent,
    GenericIndexComponent
  ],
  providers: [
    ColorPickerService,
    DND_PROVIDERS,
    ApiService,
    AlertService,
    StashService,
    AccountService,
    QuestionControlService,
    HistoryService,
    UrlService
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) { }
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
