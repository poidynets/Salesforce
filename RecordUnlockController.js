({
    doInit : function(component, event, helper) {
        // We are specifying which function should Controller run
        var action = component.get("c.unlockCaseRecord");
        // We are providing value which should be sent to our RecordUnlockApexController Apex class
        console.log("recordId", component.get('v.recordId'));
        action.setParams({
            "orderId" : component.get('v.recordId')
        })
        action.setCallback(this,function(response){
            var state = response.getState();
            alert(state);
            if(state === 'SUCCESS'|| state ==='DRAFT'){
                /*
                 * var urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                    "url":"/apex/FFA_Order_to_Invoice"
                });
                urlEvent.fire();
                */
                var responseValue = response.getReturnValue();
            }else if(state ==='INCOMPLETE'){
            }else if(state ==='ERROR'){
                var errors = response.getError();
                console.log('Error',errors)
                if(errors|| errors[0].message){
                }
            }
        },'ALL');
        $A.enqueueAction(action);
    }
})
