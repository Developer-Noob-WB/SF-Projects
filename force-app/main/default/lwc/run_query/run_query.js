import { LightningElement,wire,track } from 'lwc';
import sampleMC from '@salesforce/messageChannel/myMessageChannel__c';
import {subscribe,MessageContext} from 'lightning/messageService';
import fetchResult from '@salesforce/apex/FetchObjects.fetchResult';
export default class Run_query extends LightningElement 
{
    actualQuery='';
    isDataLoad=false;
    @track data=[];
    @track cols=[];
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
            this.isDataLoad=true;
            this.makeDataTable(data);
        }
        if(error)
        {
            console.log('Error occur');
            console.log(error);
        }
    }
    makeDataTable(data)
    {
        //if you don't include id field in the query then by default
        //the id field will be present at the last but if you include
        //then in which order you write the query, in the same order
        //it will return the data, so we have to manipulate the datatable
        //accordingly. 
        //console.log('makeDataTable called');
        let tempArr=this.actualQuery.split(' ')[1].split(',');
        //console.log(JSON.stringify(tempArr));
        if(!tempArr.includes('Id'))
            tempArr.push('Id');
        this.cols=[];//initialize the array blank for saftey
        tempArr.forEach(item=>{
            this.cols.push({label:item,fieldName:item,type:'text'});
        });
    }
}