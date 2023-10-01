// Importing Lightning Web Components and utilities
import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import CASE_OBJECT from '@salesforce/schema/Case';
import getRecordTypes from '@salesforce/apex/GetCaseRecordTypes.getRecordTypes';
import SelectTypeFirstMsg from '@salesforce/label/c.SelectTypeFirstMsg';
import SelectionHeaderMsg from '@salesforce/label/c.SelectionHeaderMsg';

// Defining the columns for the Lightning Datatable
const TABLE_COLUMNS = [
    { 
        label: 'Case Type', 
        fieldName: 'Name', 
        wrapText: true, 
        cellAttributes: {
            alignment: 'left'
        },
    },
    {
        label: 'Description',
        fieldName: 'Description',
        wrapText: true,
        cellAttributes: {
            alignment: 'left'
        },
    }
];

export default class CaseTypeSelection extends NavigationMixin(LightningElement) {
    // Setting up columns and tracking selectedRows
    @track columns = TABLE_COLUMNS;
    @track selectedRows;

    // Constructor to initialize selectedRows
    constructor() {
        super();
        this.selectedRows = [];
    }
    
    // Exposing labels to use during Case Type selection.
    label = {
        SelectTypeFirstMsg,
        SelectionHeaderMsg,
    };

    // Wire service to get object information for the Case object
    @wire(getObjectInfo, { objectApiName: CASE_OBJECT })
    objectInfo;

    // Array to store fetched record type data
    completeRecordTypeData = [];

    // Wire service to get record types based on the applicableRecordTypeIdsList
    @wire(getRecordTypes, { recordTIds: '$applicableRecordTypeIdsList' })
    wiredRecordTypes({ error, data }) {
        if (data) {
            this.completeRecordTypeData = data;
        } else if (error) {
            // Handle the error gracefully, e.g., display an error message to the user
            console.error('Error loading record types', error);
        }
    }
    
    // Getter method to filter valid record type ids
    get applicableRecordTypeIdsList() {
        const recordTypeInfo = this.objectInfo.data ? this.objectInfo.data.recordTypeInfos : null;
        const validRecordTypeIds = [];
        
        if (recordTypeInfo) {
            for (const recordTypeId in recordTypeInfo) {
                if (recordTypeInfo.hasOwnProperty(recordTypeId)) {
                    const recordType = recordTypeInfo[recordTypeId];

                    // Check if the record type is Active and not 'Master'
                    if (recordType.available === true && recordType.master === false) {
                        // Add the record type Id to the validRecordTypeIds array
                        validRecordTypeIds.push(recordTypeId);
                    }
                }
            }
        }

        return validRecordTypeIds;
    }
    
    // Getter method to format fetched record type data
    get structuredRecordTypeData() {
        const recordTypeData = [];

        if (this.completeRecordTypeData) {
            // Process the fetched data and format it
            this.completeRecordTypeData.forEach(recordType => {
                recordTypeData.push({
                    Name: recordType.Name,
                    Id: recordType.Id,
                    DeveloperName: recordType.DeveloperName,
                    Description: recordType.Description
                });
            });
        }
        return recordTypeData;
    }

    // Handler for row selection in the Lightning Datatable
    handleRowSelection(event) {
        this.selectedRows = event.detail.selectedRows;
    }

    // Handler to load data when the "Select" button is clicked
    handleSelect() {
        if (this.selectedRows.length === 1) {
            const selectedRecordType = this.selectedRows[0];
            const recordTypeId = selectedRecordType.Id;

            // Check for multiple record types and set outcome behavior
            if (
                selectedRecordType.DeveloperName === 'Case_StdRT' ||
                selectedRecordType.DeveloperName === 'Case_StdRT_2' ||
            ) {
                this.launchCaseFlow();
            } else {
                this.navigateToNewCasePage(recordTypeId);
            }
        } else {
            // Display an informational toast if no record type is selected
            this.showToast('Error', this.label.SelectTypeFirstMsg, 'error');
        }
    }

    // Navigate to a new case page with a specified record type
    navigateToNewCasePage(recordTypeId) {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Case',
                actionName: 'new'
            },
            state: {
                nooverride: '1',
                recordTypeId: recordTypeId,
                count: '1'
            }
        }, true);
    }

    // Launch a custom LWC page for case creation flow - triggered via aura component that implements "lightning:isUrlAddressable"
    launchCaseFlow() {
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: 'c__launchCaseFlowComponent'
            },
        }, true);
    }

    // Show a toast message with the provided title, message, and variant
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }
}
