import * as _ from 'lodash';
import * as types from '../model/interfaces';

/**
 * Input to map of an array of objects
 * @param {string} prefix
 * @returns a function that converts an object to a new one with all keys changed.
 */
export function renameProperties(prefix: string) {
    return (element: any) => {
        const ob: any = {};

        for (const o in element) {
            if (element.hasOwnProperty(o)) {
                ob[prefix + o] = element[o];
            }
        }

        return ob;
    };
}

export function relation(table2: any, propArray: string, propT2: string) {
    return (elem: any) => {
        let aux;

        for (let i = 0; i < elem[propArray].length; i++) {
            aux = _.find(table2, (o: any) => o[propT2] === elem[propArray][i]);

            elem[propArray][i] = aux;
        }

        return elem;
    };
}

export function dishToDishview() {
    return (element: any) => {
        // TODO: get fav & likes
        element.favourite = {
            isFav: false,
            likes: 20,
        };

        element.tweet = [];

        element.extras.forEach((element2: any) => {
            delete (element2.description);
            element2.selected = false;
            return element2;
        });

        return element;
    };
}

/**
 *
 * @param {Set<any>} setA
 * @param {Set<any>} setB
 * @returns intersection of two sets
 */
export function setIntersection(setA: Set<any>, setB: Set<any>) {
    const intersection = new Set();
    for (const elem of setB) {
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
    const res = [];

    for (const o in object) {
        if (object.hasOwnProperty(o)) {
            res.push(object[o]);
        }
    }

    return res;
}

/**
 * Check all params of FilterView and put the correct values if neccesary
 *
 * @param {types.IFilterView} filter
 * @returns
 */
export function checkFilter(filter: types.IFilterView) {
    filter.maxPrice = filter.maxPrice || 50;
    filter.minLikes = filter.minLikes || 0;
    filter.searchBy = filter.searchBy || '';
    filter.isFab = filter.isFab || false;

    if (filter.order === 1) {
        return 'price';
    } else if (filter.order === 2) {
        return 'noseque';
    }

    return 'name';
}
