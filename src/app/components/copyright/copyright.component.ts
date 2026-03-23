import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
    selector: 'app-copyright',
    templateUrl: './copyright.component.html',
    styleUrls: ['./copyright.component.scss'],
})
export class CopyrightComponent implements OnInit {
    readonly year = new Date().getFullYear();

    constructor(private util: UtilService) {}

    ngOnInit(): void {}

    toggleNewsletter() {
        this.util.newsLetterShow = !this.util.newsLetterShow;
    }
}
