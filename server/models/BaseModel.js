class BaseModel
{

    constructor(){
    }

    static fromJSON(jsonString) {
        const jsonObj = JSON.parse(jsonString instanceof String ? jsonString : JSON.stringify(jsonString));
        return new this(jsonObj);
    }



    toJSON() {
        let data = {}
        for (let key of Object.keys(this)) {
            if (Object.keys(this).indexOf(key) > -1) data[key] = this[key]
        }
        // return JSON.parse(JSON.stringify(data));
        return Object.assign(this, data);

        
    }
}

module.exports = BaseModel