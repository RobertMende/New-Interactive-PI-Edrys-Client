function mergeDeep(target, source) {
    // Iterate over each key in the source object
    for (const key in source) {
        // If the source key is an object and the target key is also an object, merge them recursively
        if (source[key] instanceof Object && key in target) {
            Object.assign(source[key], mergeDeep(target[key], source[key]));
        }
    }
    
    // Perform a shallow merge for the other keys
    return Object.assign(target || {}, source);
}

export {mergeDeep}