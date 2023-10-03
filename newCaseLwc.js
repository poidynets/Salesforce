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

    // Event handler for the flow status change
    handleStatusChange(event) {
        // Check if the flow has finished
        if (event.detail.status === 'FINISHED') {
            // If finished, navigate to the Recent Cases list view
            this.navigateToCases();
        }
    }
    
    // Method to navigate to the Recent Cases list view
    navigateToCases() {
        // Using the NavigationMixin to navigate to the Case object's Recent list view
        this[NavigationMixin.Navigate]({
            type: "standard__objectPage",
            attributes: {
                objectApiName: "Case",
                actionName: "home",
            },
        },
        true, // Replaces the current page in browser history with the URL
        );
    } 

}
