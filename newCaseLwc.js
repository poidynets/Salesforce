import { LightningElement, api } from 'lwc';
import uId from '@salesforce/user/Id';
import { NavigationMixin } from "lightning/navigation";
export default class LaunchCaseCreationLwc extends LightningElement {
    @api userId = uId;
    @api site = 'TSVConnect';

    
    connectedCallback() {
    }

    get inputVariables() {
        return [
            {
                name: 'Site',
                type: 'String',
                value: this.site
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