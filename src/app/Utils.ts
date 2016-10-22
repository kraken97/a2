export namespace Utils {
    export function isHTML(str) {
        var doc = new DOMParser().parseFromString(str, "text/html");
        return doc.querySelector("title");
    }



    export function parseObject(acc, obj) {
        let resString = acc;
        if (typeof (obj) === "string")
            return obj;
        for (let r of Object.keys(obj)) {
            if (obj[r] instanceof Array) {
                resString += r + ': ['
                for (let arrayElem of obj[r]) {
                    resString += arrayElem;
                }
                resString += '] ';
            }
            else if (obj[r] instanceof Object) {
                resString += this.parseObject('', obj[r]);
            } else {
                let row = `${r}  :  ${obj[r]}  ,  `;
                resString += row + '  ';
            }

        }
        return resString;
    }

}