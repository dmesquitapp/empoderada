class BaseModel
{

    constructor(){
    }

    fromJSON(options) {
        const keys = Object.keys(options)
        if (keys.length) {
            keys.forEach(k => {
                if(k in this) this[k] = options[k]
            })
        }
        return this;
    }


    toJSON() {
        let data = {}
        for (let key of Object.keys(this)) {
            data[key] = this[key]
        }
        return JSON.parse(JSON.stringify(data));

        
    }
}

module.exports = BaseModel