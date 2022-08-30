/**
    ** GetOpportunityGoods_Test Class
    ** @author Vasyl Poidynets : Vasyl_Poidynets@gmail.com | 30-08-2022
    **/
@isTest
private with sharing class GetOpportunityGoods_Test {
    
    @isTest
    static void test_GetOpportunityGoods() {

        // Insert Products
        // Insert Opportunity
        // Insert Opportunity Goods

        Test.startTest();
        GetOpportunityGoods.Requests req = new GetOpportunityGoods.Requests();
        req.recordId = o.Id;
        List<GetOpportunityGoods.Results> results = GetOpportunityGoods.execute(new List<GetOpportunityGoods.Requests> { req });
        System.Assert(!results.isEmpty(), '"results" should not be empty');
        GetOpportunityGoods.Results result = results.get(0);
        System.Assert(!result.oppGoods.isEmpty(), 'There should be value in "oppGoods"');
        System.Assert(result.oppGoods.size() == 3, 'There should be 3 values available in "oppGoods"');
        Test.stopTest();
    }

}