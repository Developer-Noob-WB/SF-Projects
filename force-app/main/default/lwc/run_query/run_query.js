import { LightningElement,wire } from 'lwc';
import sampleMC from '@salesforce/messageChannel/myMessageChannel__c';
import {subscribe,MessageContext} from 'lightning/messageService';
export default class Run_query extends LightningElement 
{
    actualQuery='';
    queryNeedToSend='';
    @wire(MessageContext)context;
    connectedCallback()
    {
        subscribe(this.context,sampleMC,msg=>{this.actualQuery=msg.lmsData.data});
        this.queryNeedToSend=this.actualQuery.replaceAll('\'','\\\'');
    }
}