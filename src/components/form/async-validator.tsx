export type Validate = (fn: Validate, value: string) => string;

interface Des{
    [_:string]:{
        min:number,
        max:number,
        validate:Validate,
    }
}

interface Values{
    [_:string]:[] | string
}
class Schema {
    des: Des;
    constructor(des:{}){
        this.des = des;
    }
    validate = (values: Values) => {
        return new Promise(async(resolve,reject)=>{
            const errorFields = [];
            for(const name in this.des) {
                const value = values[name];
                const rules = this.des[name];
                const ruleKeys = Object.keys(rules);// [required,min,max]
                const errors = [];

                for (let i = 0;i<ruleKeys.length; i++){
                    const ruleKey = ruleKeys[i];
                    if(ruleKey === 'required'&&!value){
                        errors.push(`${name} is required`)
                    } else if(ruleKey === 'min'){
                        if(value.length < rules[ruleKey])
                        errors.push(`${name} is required`)
                    } else if(ruleKey === 'max'){
                        if(value.length > rules[ruleKey])
                        errors.push(`${name} is required`)
                    } else if(ruleKey === 'validate'){
                        let validate = rules[ruleKey];
                        let result = validate(validate, value as string);
                        if(result.length>0){
                            errors.push(`${name} 不符合自定义校验器的规则判断`)
                        }
                    }
                }

                if(errors.length>0){
                    errorFields.push({name,errors})
                }
            }
            if(errorFields.length>0){
                reject({errorFields,values});
            }else{
                resolve(values);
            }
        })
    }
}

export default Schema
/*
const des = {
    name:{
        required: true
    },
    age: {
        required: true
    }
}
*/