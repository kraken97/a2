import { Component, Input, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Output } from '@angular/core';
import { Variables } from './../../constants';
import { AlertService } from './../../services/alert-service.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'input-file',
    templateUrl: 'input-file.component.html',
    styleUrls: ['input-file.css'],
})
export class InputFileComponent {
    host = Variables.protocol + Variables.host;
    url = Variables.fileUpload;
    @Input() required: boolean = true;
    @Output() value = new EventEmitter();
    @Input() imageUrl;
    @Input() screenshotType: number = 0;
    errors;
    constructor(
        private es: AlertService,
        private sanitizer: DomSanitizer
    ) { }

    handleUpload(data): void {
        this.makeFileRequest(this.url, null, data.srcElement.files).subscribe(res => {
            if (res.success) {
                this.value.emit(res.imageUrl);
                this.imageUrl = res.imageUrl;
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
            formData.append('id', this.screenshotType);
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }
    reset() {
        this.value.emit('');
        this.imageUrl = '';
        this.errors = null;
    }

}
