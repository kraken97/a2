import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Screenshot } from '../../models/screenshot';
import { ApiService } from '../../services/api-service.service';
import { AlertService } from '../../services/alert-service.service';
import { Variables } from './../../constants';
import { IMAGE_TYPES } from './../../models/image-types';
import { AccountService } from './../../services/account.service';


@Component({
  selector: 'app-screenshot',
  templateUrl: 'screenshot.component.html'
})
export class ScreenshotComponent implements OnInit {

  saveUrl = Variables.screenshot;
  @Input() isTypeSelectable = true;
  @Input() screenshotPath;
  // ID of entity to which the screenshot will be related after adding
  @Input() id;
  @Input() screenshots = new Array<Screenshot>();
  @Input() screenshotType = 0;
  @Output() updated = new EventEmitter();
  @Input() date: Date;
  @Input() properties = ['name', 'visible'];
  showing = new EventEmitter();

  fromErrors: any = {};
  screenshotTypes: Array<any> = IMAGE_TYPES;
  screenshot: Screenshot;
  opened = false;
  defaultName;

  constructor(
    private apiService: ApiService,
    private alertService: AlertService,
    private account: AccountService) { }


  ngOnInit() {
    this.screenshot = new Screenshot(0, 0, '', '', false, this.screenshotType, this.date);
  }

  valueChanged(event) {
    this.screenshot.imageUrl = event;
    this.showing.emit(true);
  }

  saveScreenshot() {
    if (this.screenshotType === 1) {
      this.screenshot.workId = this.id;
    } else {
      this.screenshot.designSlideId = this.id;
    }
    this.apiService.mainPath = this.saveUrl;
    this.apiService.post(this.screenshot).subscribe(
      r => {
        this.updated.emit();
        this.opened = false;
        this.screenshot = new Screenshot(0, 0, '', '', false, this.screenshotType, this.date);
      },
      e => {
        this.alertService.error('server-error', e)
      });
  }

  onDelete(index) {
      this.apiService.mainPath = this.saveUrl;
        this.apiService.delete(index).subscribe(
            r => {
                this.alertService.info('success', `${this.saveUrl} ${index} was deleted`);
            },
            err => {
                this.alertService.error('warning', err.body);
            },
            () => this.updated.emit()
        );
        return false;
  }
  clear() {
    this.screenshot = new Screenshot(0, 0, '', '', false, this.screenshotType, this.date);
    return false;
  }
}
