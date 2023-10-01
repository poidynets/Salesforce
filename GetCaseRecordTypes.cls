/*
Author: Vas
Created On: Sep 30, 2023
Purpose: This class's method is responsible for retrieving RecordType records based on the provided Record Type Ids.

Input variables:
recordTIds - Collection of Ids

Outputs:
Collection of RecordType records
*/
public class GetCaseRecordTypes {

    /**
     * @description Retrieves RecordType records based on the provided Record Type Ids.
     * @param recordTIds List of Case Ids.
     * @return List of RecordType records.
     */
    @AuraEnabled(cacheable=true)
    public static List<RecordType> getRecordTypes(List<Id> recordTIds) {
        // Query for RecordType records based on the provided Ids
        return [SELECT Id, Description, Name, DeveloperName FROM RecordType WHERE SObjectType = 'Case' AND Id IN :recordTIds LIMIT 100];
    }
}
