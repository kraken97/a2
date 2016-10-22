export namespace Utils {
    export function isHTML(str) {
        var doc = new DOMParser().parseFromString(str, "text/html");
        return doc.querySelector("title");
    }


    function logMethod(target: Function, key: string, value: any) {
        return {
            value: function (...args: any[]) {
                var a = args.map(a => JSON.stringify(a)).join();
                var result = value.value.apply(this, args);
                var r = JSON.stringify(result);
                console.log(`Call: ${key}(${a}) => ${r}`);
                return result;
            }
        };
    }





    function logProperty(target: any, key: string, l) {

        console.log(l);
        console.log(target);
        // property value
        var _val = this[key];

        console.log(_val);
        // property getter
        var getter = function () {
            console.log(`Get: ${key} => ${_val}`);
            return _val;
        };

        // property setter
        var setter = function (newVal) {
            console.log(`Set: ${key} => ${newVal}`);
            _val = newVal;
        };

        // Delete property.
        if (delete this[key]) {

            // Create new property with getter and setter
            Object.defineProperty(target, key, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
    }

    function logClass(target: any) {

        // save a reference to the original constructor
        var original = target;

        // a utility function to generate instances of a class
        function construct(constructor, args) {
            var c: any = function () {
                return constructor.apply(this, args);
            }
            c.prototype = constructor.prototype;
            return new c();
        }

        // the new constructor behaviour
        var f: any = function (...args) {
            console.log("New: " + original.name);
            return construct(original, args);
        }

        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;

        // return new constructor (will override original)
        return f;
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