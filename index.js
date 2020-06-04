import Logics from './Logics'
import Storage from './Storage'
import StateManagement from './Hook'

Storage.init();

const Manager = {
    do: async ({func, params, key}) => {
        const data = await func({...params});
        if (data !== undefined) {
            const result = await Storage.set(key, data);
            //todo define callback :)
            if (result.status) {

            } else {

            }
        }
    },
};

export const doAction = (key, params) => {
    if (Logics[key] !== undefined && typeof Logics[key] === "function") {
        Manager.do({func: Logics[key], params, key}).then(() => {

        }).catch(() => {

        });

    } else {
        console.log("the key is not defined ;)")
    }
};

export const StateManager = {
    doAction,
    useData: StateManagement
};