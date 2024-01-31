class BaseModel
{

    constructor(){
    }

    fromJSON(options) {
        let obj = Object.assign(this, options)
        Object.keys(obj).forEach(key => {
            if (obj[key] === undefined) {
                delete obj[key];
            }
        });
        return obj;
    }



    toJSON() {
        let data = {}
        for (let key of Object.keys(this)) {
            data[key] = this[key]
        }
        // return JSON.parse(JSON.stringify(data));
        return Object.assign(this, data);

        
    }
}

module.exports = BaseModel