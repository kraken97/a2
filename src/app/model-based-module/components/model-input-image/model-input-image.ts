import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertService } from './../../../services/alert-service.service';

import { Variables } from '../../../constants';
@Component({

    selector: 'input-image',
    templateUrl: './model-input-image.html'
})
export class ModelInputImageComponent {

    @Input() imageType;
    @Input() formGroup: FormGroup;
    @Input() controlName: string;

    host = Variables.protocol + Variables.host;
    url = Variables.fileUpload;

    @Input() value;

    errors;

    constructor(
        private es: AlertService,
        private sanitizer: DomSanitizer
    ) { }

    handleUpload(data): void {
        this.makeFileRequest(this.url, null, data.srcElement.files).subscribe(res => {
            if (res.success) {
                this.value = res.imageUrl;
                this.formGroup.controls[this.controlName].setValue(res.imageUrl);
                this.errors = null;
            }
            else {
                this.es.error('screenshot upload error', res.message);
                this.errors = res.message;
            }
        }, e => {
            this.errors = e;
        });
    }
    private makeFileRequest(url: string, params: string[], files: File[]): Observable<any> {

        return Observable.create(observer => {
            let xhr: XMLHttpRequest = new XMLHttpRequest();

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };
            let formData = new FormData();
            formData.append('thefile', files[0]);
            formData.append('id', this.imageType);
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }
    reset() {
        this.value.emit('');
        this.value = '';
        this.errors = null;
    }

}

