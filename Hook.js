import  {useState, useEffect} from 'react';
import Storage from './Storage'

function useStateManagement({keys}) {
    const [data, setData] = useState();
    const generateKeyForEachComponent = Math.random();

    useEffect(() => {
        //the variable keep last status of data of component
        this.localDataOfState = {};
        //define event to receive update when data changed in another components
        Storage.event((key, newData) => {
            //check if key defined in this component
            if (keys.indexOf(key) >= 0) {
                const mergedData = Object.assign({}, this.localDataOfState[generateKeyForEachComponent], {
                    ...newData
                });
                setData(mergedData);
                this.localDataOfState[generateKeyForEachComponent] = mergedData;
            }
        });
        //init and rehydrate oldData
        Storage.rehydrate(keys).then((response) => {
            this.localDataOfState[generateKeyForEachComponent] = response;
            setData(response)
        }).catch(() => {

        })

    }, []);

    return {
        data: data,
    };
}

export default useStateManagement