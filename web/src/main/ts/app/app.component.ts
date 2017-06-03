import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'application-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
    constructor() {
        console.log("some other log message");
    }
}
