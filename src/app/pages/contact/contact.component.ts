import { Component, OnInit } from '@angular/core';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UtilService } from 'src/app/services/util/util.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
    faLongArrowAltRight = faLongArrowAltRight;
    fileToUpload: File;
    showSuccessMessage: boolean = false;
    showErrorMessage: boolean = false;
    submitSpinner: boolean = false;
    constructor(private http: HttpClient, private util: UtilService) {}

    ngOnInit(): void {
        this.util.setPageTitleAndMeta(
            'Contact Us',
            'Contact Steezapp regarding new business or questions'
        );
    }

    onSubmit(form: NgForm) {
        this.submitSpinner = true;

        let formValues = form.form.value;
        const url =
            environment.apiBase +
            '/wp-json/contact-form-7/v1/contact-forms/22/feedback';
        const formData = new FormData();
        formData.append('_wpcf7_unit_tag', 'wpcf7-f22-o1');
        formData.append('firstName', formValues.firstName);
        formData.append('lastName', formValues.lastName);
        formData.append('email', formValues.email);
        formData.append('phoneNumber', formValues.phoneNumber);
        formData.append('description', formValues.description);
        formData.append('selectFile', this.fileToUpload);

        this.http.post(url, formData).subscribe({
            next: (res: any) => {
                if (res.status == 'mail_sent') {
                    this.showSuccessMessage = true;
                    this.showErrorMessage = false;
                    form.reset();
                } else {
                    this.showErrorMessage = true;
                    this.showSuccessMessage = false;
                }
                this.submitSpinner = false;
            },
            error: () => {
                this.showErrorMessage = true;
                this.showSuccessMessage = false;
                this.submitSpinner = false;
            },
        });
    }

    pickImage(files: FileList) {
        let file = files[0];
        console.log('files.item -> ', file);
        if (file.size > 26214400) {
            console.log('file is bigger than 25 mb');
        } else {
            this.fileToUpload = file;
        }
    }
}
