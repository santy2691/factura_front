import { Component } from '@angular/core';
import {TuiRootModule} from '@taiga-ui/core';
import {TuiBlockStatusModule} from '@taiga-ui/layout';

@Component({
    selector: 'app-not-found',
    imports: [TuiRootModule, TuiBlockStatusModule],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
