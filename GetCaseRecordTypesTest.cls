/*
Author: Vas
Created On: Sep 30, 2023
Test Class for GetCaseRecordTypes
Purpose: This test class validates the functionality of the GetCaseRecordTypes class, specifically the getRecordTypes method.
*/
@isTest
private class GetCaseRecordTypesTest {

    @isTest
    static void GetCaseRecordTypesTest() {
        // Create test Case records and corresponding RecordTypes
        List<Case> testCases = new List<Case>();
        List<Id> testRecordTypeIdList = new List<Id>();
        List<RecordType> resultRecordTypes;
        final String PROFILE_NAME = 'Standard User'; // Used to store the Name of the profile.
        final String RECORD_TYPE_DEVELOPER_NAME = 'Case_StdRT'; // Used to store the Case Record Type Developer Name Assigned to Profile.
        // Retrieve the profile Id for creating a test user.
        Id profileId = [SELECT Id FROM Profile WHERE Name= :PROFILE_NAME].id;
		
        Account acc = Utility.createAccount();
		insert acc;

        Contact cont = new Contact();
        cont = Utility.createContact(acc.Id);
        cont.email = 'Test12345@test.com';
        insert cont; 

        Case testCase = new Case();
		testCase = Utility.createCase();
        testCase.Status = 'New';
        testCase.ContactId = cont.Id;
        testCase.AccountId = acc.Id;
        Id caseRecordTypeId = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get(RECORD_TYPE_DEVELOPER_NAME).getRecordTypeId();
        testCase.RecordTypeId = caseRecordTypeId;
            
        testCases.add(testCase);
        testRecordTypeIdList.add(caseRecordTypeId);
        
        insert testCases;

        User testUser=new User();
        testUser.Username='tu@txt.com';
        testUser.LastName='Tu';
        testUser.Alias='tu';
        testUser.Email='tu@test.com';
        testUser.CommunityNickname='tu12345';
        testUser.ProfileId=profileId;
        testUser.EmailEncodingKey='ISO-8859-1';
        testUser.TimeZoneSidKey='GMT';
        testUser.LocaleSidKey='en_US';
        testUser.LanguageLocaleKey='en_US';        
        insert testUser; 

        // Call the controller method
        Test.startTest();
        System.RunAs(testUser){
            resultRecordTypes = GetCaseRecordTypes.getRecordTypes(testRecordTypeIdList);
        }
        Test.stopTest();

        // Assertions
        Assert.isTrue(resultRecordTypes.size() != 0, 'List should have at least one Record Type item');
        
        for (RecordType recType : resultRecordTypes) {
            Assert.isTrue(recType.Name != null, 'Record Type should have a name');
            Assert.isTrue(recType.DeveloperName != null, 'Record Type should have a developer name');
        }
    }
}
