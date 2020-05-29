import Dexie from 'dexie'

var ee = require('event-emitter');

var MyClass = function () { /* .. */
};
ee(MyClass.prototype); // All instances of MyClass will expose event-emitter interface

var emitter = new MyClass(), listener;

export const Storage = {
    db: undefined,
    event: async (callback) => {
        emitter.on('changedData', listener = function (args) {
            const result = {};
            Storage.get(args.key).then((data) => {
                result[args.key] = data;
                callback(args.key, result);
            })
        });
    },
    init: () => {
        Storage.db = new Dexie("appStore");
        Storage.db.version(1).stores({
            data: "key, data",
        });
    },
    get: (key) => {
        return new Promise(async (resolve, reject) => {
            if (key.toString().length > 0) {
                try {
                    const data = await Storage.db.data.where("key").equalsIgnoreCase(key).toArray();
                    if (data && data.length > 0) {
                        resolve(data[0].data)
                    } else {
                        resolve({})
                    }
                } catch (e) {
                    reject(e)
                }
            } else {
                console.warn("the key for state management cant be empty")
            }
        })
    },
    set: (key, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await Storage.db.data.put({key, data})
                resolve({message: "Saved", key: response})
                emitter.emit('changedData', {key: response});
            } catch (error) {
                reject(error)
            }
        })
    },
    rehydrate: (keys) => {
        return new Promise((resolve, reject) => {
            const finalizeData = {};
            keys.map(async (keyOfData, index) => {
                finalizeData[keyOfData] = await Storage.get(keyOfData);
                if (index === (keys.length - 1)) {
                    resolve(finalizeData);
                }
            });
        })
    }
};

export default Storage