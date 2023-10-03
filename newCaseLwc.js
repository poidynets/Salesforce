import { LightningElement, api } from 'lwc';
import uId from '@salesforce/user/Id';
import { NavigationMixin } from "lightning/navigation";
export default class NewCase extends LightningElement {
    @api userId = uId;
    @api env = 'Dev';

    
    connectedCallback() {
    }

    get inputVariables() {
        return [
            {
                name: 'Env',
                type: 'String',
                value: this.env
            },
            {
                name: 'UserId',
                type: 'String',
                value: this.userId
            }
        ];
    }

    handleStatusChange(event) {
        if (event.detail.status === 'FINISHED') {
        }
    }    

}
