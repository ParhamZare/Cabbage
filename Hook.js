import React, {useState, useEffect, useCallback} from 'react';
import Storage from './Storage'

function useStateManagement({keys}) {
    const [data, setData] = useState();

    useEffect(() => {
        //define event to receive update when data changed in another components
        Storage.event((key, data) => {
            //check if key defined in this component
            if (keys.indexOf(key) >= 0) {
                setData(data)
            }
        });
        //init and rehydrate oldData
        Storage.rehydrate(keys).then((response) => {
            setData(response)
        }).catch(() => {

        })

    }, []);
    const testData = (title) => {
        setData(Object.assign({}, data, {
            title
        }))
    };
    return {
        data: data,
        testData
    };
}

export default useStateManagement