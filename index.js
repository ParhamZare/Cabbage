import Logics from './Logics'
import Storage from './Storage'
import  useStateManagement from './Hook'
Storage.init();
const Manager={
    do:async(func,params,key)=>{
        const data=await func({...params});

        if(data!==undefined){
            
            const result= await Storage.set(key,data)
            console.log(result);

        }    
    },
}
export const doSomeThing=(key,params)=>{    
    if(Logics[key]!==undefined&&typeof Logics[key]==="function"){
        Manager.do(Logics[key],params,key).then(()=>{

        }).catch(()=>{

        });
            
    }else{
        console.log("the key is not defined ;)")
    }
}

export const StateManager={
    doSomeThing,
    useStateManagement
}