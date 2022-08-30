public with sharing class GetOpportunityGoods {
    /**
     * @description Get Opportunity Goods
     * @author Vasyl Poidynets : Vasyl_Poidynets@gmail.com | 30-08-2022 
     * @param requests - Class Resquests : recordId
     * @return List<Results> - Opportunity Goods
     **/
    @InvocableMethod( label = 'Get Opportunity Goods' description = '' category = 'Opportunity' )
    public static List<Results> execute(List<Requests> requests) {
        List<Results> result;
        // Get the first request = Only request
        Requests req = requests.get(0);
        Id recId = req?.recordId;

        // Get Opportunity Goods
        List<OpportunityGood__c> oppGoods = [SELECT Id, OpportunityId, Product2Id, 
                                                CurrencyISOCode, Product2.Type_of_Product__c, Tax_Type__c
                                                FROM OpportunityGood__c 
                                                WHERE Product2.Type_of_Product__c = 'HW' AND (Tax_Type__c = 'V' OR Rev_Type__c = 'I') AND OpportunityId= :recId
                                                ORDER BY Name
                                                LIMIT 49000];


        Results response = new Results();
        response.oppGoods = oppGoods;
        result = new List<Results>{ response };
        return result;
    }
    public class Requests {
        @InvocableVariable(label='Opportunity Id' description='Record used to retrieve related Opportunity Good Record.' required=true)
        public Id recordId;
    }
    public class Results {
        @InvocableVariable(label='Opportunity Goods' description='Opportunity Goods')
        public List<OpportunityGood__c> oppGoods;
    }
}