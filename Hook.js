import React, { useState, useEffect,useCallback } from 'react';
import Storage from './Storage'
function useStateManagement({keys}) {
  const [data, setData] = useState();  
  const [event,setEvent] =useState(false)

  useEffect(()=>{
    Storage.event((key,data)=>{               
        if(keys.indexOf(key)>=0){   
            console.log("SSS")                     
            setData(data)
        }  
    })    
      
  },[data,event])
  return {
      data:data
  };
}
export default useStateManagement