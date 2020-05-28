import Dexie from 'dexie'
var ee = require('event-emitter');

var MyClass = function () { /* .. */ };
ee(MyClass.prototype); // All instances of MyClass will expose event-emitter interface
 
var emitter = new MyClass(), listener;

export const Storage={
    db:undefined,
    event:async(callback)=>{        
        emitter.on('changedData', listener = function (args) {            
            Storage.get(args.key).then((data)=>{
                const result={
                    
                };
                result[args.key]=data;
                callback(args.key,result);
            })         
        });
    },
    init:()=>{    
        Storage.db=new Dexie("appStore");
        Storage.db.version(1).stores({
            data: "key, data",            
        });
    },
    get:(key)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                const data=await Storage.db.data.where("key").equalsIgnoreCase(key).toArray();
                resolve(data[0].data)
            }catch(e){
                reject(e)
            }
        })
    },
    set:(key,data)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                const response=await Storage.db.data.put({key,data})                        
                resolve({message:"Saved",key:response})
                emitter.emit('changedData',{key:response}); 
            }catch(error){
                reject(error)
            }                        
        })        
    }
}
export default Storage