import { LightningElement,track,wire } from 'lwc';
import fetchObjectsInfo from '@salesforce/apex/FetchObjects.fetchObjectsInfo';
import fetchFieldsInfo from '@salesforce/apex/FetchObjects.fetchFieldsInfo';
import sampleMC from '@salesforce/messageChannel/myMessageChannel__c';
import {publish,MessageContext} from 'lightning/messageService';
export default class Work_bench extends LightningElement 
{
    @wire(MessageContext)context;
    @track options=[];
    @track fieldsOption=[];
    @track filterOptions=[
        {label:'=',value:'='},
        {label:'<=',value:'<='},
        {label:'<',value:'<'},
        {label:'>=',value:'>='},
        {label:'<>',value:'<>'},
        {label:'in',value:'in'},
        {label:'not in',value:'not in'},
        {label:'like',value:'like'}
    ];
    loadingObjectFlag=false;
    choosedObject;
    choosedFields;
    choosedFilterField;
    choosedOperatorField;
    choosedValueField;
    actualQuery='';
    @wire(fetchObjectsInfo)
    handler({data,error})
    {
        if(data)
        {
            data.forEach(item=>{
                this.options.push({label:item,value:item});
            });
            this.loadingObjectFlag=true;
            //console.log(JSON.stringify(this.options));
        }
        if(error)
        {
            console.log(error);
        }
    }
    optionHandler()
    {
        this.choosedObject=this.template.querySelector('.c1').value;
        //console.log(this.choosedObject);
        //if you change the object then make the query blank
        this.actualQuery='';
        this.template.querySelector('.c6').value=this.actualQuery;
        //fetching the fields of the selected object
        fetchFieldsInfo({obj:this.choosedObject}).then(data=>{
            //console.log(JSON.stringify(data));
            this.fieldsOption=[];//each time if you change the object then initialize the blank array
            data.forEach(item=>{
                this.fieldsOption.push({label:item,value:item});
            });
        }).catch(error=>{
            console.log(error);
        })
    }
    fieldsHandler()
    {
        this.choosedFields=this.template.querySelector('.c2').value;
        //console.log(JSON.stringify(this.choosedFields));
        this.actualQuery='';//initialize the string as blank to make a new query if you change the fields
        this.actualQuery+='Select ';
        this.choosedFields.forEach(item=>{
            this.actualQuery+=`${item},`;
        })
        //this is use to remove the last , from the query
        this.actualQuery=this.actualQuery.slice(0,this.actualQuery.length-1);
        this.actualQuery+=` from ${this.choosedObject}`;
        this.template.querySelector('.c6').value=this.actualQuery;
    }
    filterFieldHandler()
    {
        this.choosedFilterField=this.template.querySelector('.c3').value;
        //console.log(JSON.stringify(this.choosedFilterField));
    }
    filterOperatorHandler()
    {
        this.choosedOperatorField=this.template.querySelector('.c4').value;
        //console.log(JSON.stringify(this.choosedOperatorField));
    }
    filterValueHandler()
    {
        this.choosedValueField=this.template.querySelector('.c5').value;
        //console.log(JSON.stringify(this.choosedValueField));
    }
    filterHandler()
    {
        if(!this.actualQuery.includes('where'))
            this.actualQuery+=` where ${this.choosedFilterField} ${this.choosedOperatorField} ${this.choosedValueField}`;
        else
            this.actualQuery+=` and ${this.choosedFilterField} ${this.choosedOperatorField} ${this.choosedValueField}`;
        this.template.querySelector('.c6').value=this.actualQuery;
    }
    runQueryHandler()
    {
        //console.log(this.actualQuery);
        //console.log(typeof(this.actualQuery));
        publish(this.context,sampleMC,{lmsData:{data:this.actualQuery}});
    }
}