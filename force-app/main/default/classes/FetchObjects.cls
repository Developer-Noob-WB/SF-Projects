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
    @auraEnabled(cacheable=true)
    public static list<sobject> fetchResult(string query)
    {
        System.debug(query);
        list<sobject> data=new list<sobject>();
        Database.querylocator q=Database.getquerylocator(query);//gov limit 50M
        Database.querylocatoriterator it=q.iterator();
        while(it.hasNext())
        {
            data.add(it.next());
        }
        return data;
    }
}