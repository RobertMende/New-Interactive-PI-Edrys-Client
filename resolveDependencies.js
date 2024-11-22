

const resolveDependencies=(config, dependencies)=>{
    for(const key of Object.keys(config)){
        if(isUnresolvedValue(config[key])) {
            const value=resolveValue(config[key], dependencies);
            config[key]=value;
        }
    }
    return config;
}

const resolveValue=(unresolvedValue, dependencies)=>{
    let value=dependencies;
    for(const part of splitDependency(unresolvedValue)){
        if(!value.hasOwnProperty(part)) throw new Error(`There is no key \"${part}\" in the given object ${JSON.stringify(value)}`);

        value=value[part];
    }
    return value;
}

const splitDependency = value =>  value.slice(1).split('.');


const isUnresolvedValue = value => typeof(value) === "string" && value.startsWith('@');
