import { LightningElement,wire } from 'lwc';
import sampleMC from '@salesforce/messageChannel/myMessageChannel__c';
import {subscribe,MessageContext} from 'lightning/messageService';
import fetchResult from '@salesforce/apex/FetchObjects.fetchResult';
export default class Run_query extends LightningElement 
{
    actualQuery='';
    @wire(MessageContext)context;
    connectedCallback()
    {
        subscribe(this.context,sampleMC,msg=>{
            this.actualQuery=msg.lmsData.data;
        });
    }
    @wire(fetchResult,{query:'$actualQuery'})
    dataHandler({data,error})
    {
        if(data)
        {
            console.log(JSON.stringify(data));
        }
        if(error)
        {
            console.log('Error occur');
            console.log(error);
        }
    }
}