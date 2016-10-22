import { Injectable } from '@angular/core';
import { ToastyService, ToastOptions, ToastData, ToastyConfig } from 'ng2-toasty';
import { StashService } from "./stash.service";
import { Notification } from "../models/notification";

interface IAlertService {
  alert(title: string, msg: string): void;
  warning(title: string, msg: string): void;
  error(title: string, msg: string): void;
  info(title: string, msg: string): void;
  success(title: string, msg: string): void;
  wait(title: string, msg: string): void;

}





@Injectable()
export class AlertService implements IAlertService {

  private getOptions(title, msg) {
    var toastOptions: ToastOptions = {
      title: title,
      msg: msg,
      showClose: true,
      timeout: 5000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        //console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        //console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    return toastOptions;
  }


  public alert(title: string, msg: string): void {
    this.toastyService.info(this.getOptions(title, msg));
    this.stashService.notifications.push(new Notification("alert", title, msg))
  }

  public warning(title: string, msg: string): void {
    this.toastyService.warning(this.getOptions(title, msg));
    this.stashService.notifications.push(new Notification("warning", title, msg))
  }

  public error(title: string, msg: string): void {
    this.toastyService.error(this.getOptions(title, msg));
    this.stashService.notifications.push(new Notification("danger", title, msg))

  }

  public info(title: string, msg: string): void {
    this.toastyService.info(this.getOptions(title, msg));
    this.stashService.notifications.push(new Notification("info", title, msg))
  }

  public success(title: string, msg: string): void {
    this.toastyService.success(this.getOptions(title, msg));
    this.stashService.notifications.push(new Notification("success", title, msg))
  }

  public wait(title: string, msg: string): void {
    this.toastyService.wait(this.getOptions(title, msg));
    this.stashService.notifications.push(new Notification("wait", title, msg))
  }

  constructor(public toastyService: ToastyService, private toastyConfig: ToastyConfig, private stashService: StashService) {
    this.toastyConfig.theme = 'default';
  }
}
