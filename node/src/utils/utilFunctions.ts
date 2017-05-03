import * as types from "../model/interfaces";

/**
 * Input to map of an array of objects
 * 
 * @param {string} prefix 
 * @returns a function that converts an object to a new one with all keys changed.
 */
export function renameProperties(prefix: string) {
    return (element: any) => {
        let ob: any = {};

        for (let o in element) {
            ob[prefix + o] = element[o];
        }

        return ob;
    }
}

/**
 * 
 * @param {Set<any>} setA 
 * @param {Set<any>} setB 
 * @returns intersection of two sets
 */
export function setIntersection(setA: Set<any>, setB: Set<any>) {
    var intersection = new Set();
    for (var elem of setB) {
        if (setA.has(elem)) {
            intersection.add(elem);
        }
    }

    return intersection;
}

/**
 * Implementation of Object.values() for ES6.
 * 
 * @param {*} object 
 * @returns all values of the object as array
 */
export function objectToArray(object: any) {
    let res = [];
    for (let o in object) {
        res.push(object[o]);
    }

    return res;
}


/**
 * Check all params of FilterView and put the correct values if neccesary
 * 
 * @param {types.FilterView} filter 
 * @returns 
 */
export function checkFilter(filter: types.FilterView){
	filter.maxPrice = filter.maxPrice || 50;
	filter.minLikes = filter.minLikes || 0;
	filter.searchBy = filter.searchBy || "";
	filter.isFab = filter.isFab || false;

    if (filter.order === 1){
        return "price";
    }else if (filter.order === 2){
        return "noseque";
    }

    return "orderName";
}