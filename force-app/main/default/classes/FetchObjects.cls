public class FetchObjects 
{
    @auraEnabled(cacheable=true)
    public static list<string> fetchObjectsInfo() 
    {
        list<string> l=new list<string>();
        map<string,schema.sobjectType> m=schema.getGlobalDescribe();
        for(string token:m.keySet())
        {
            schema.describeSobjectResult r=m.get(token).getDescribe();
            l.add(r.getName());
        }
        l.sort();
        return l;
    }
    @auraEnabled(cacheable=true)
    public static list<string> fetchFieldsInfo(string obj)
    {
        list<string> l=new list<string>();
        schema.sobjectType objToken=schema.getGlobalDescribe().get(obj);
        map<string,sobjectField> m=objToken.getdescribe().fields.getMap();
        for(string token:m.keySet())
        {
            schema.describeFieldResult r=m.get(token).getDescribe();
            l.add(r.getName());
        }
        l.sort();
        return l;
    }
}