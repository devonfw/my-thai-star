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

export function relationArrayOfIds(table2: any, propArray: string, propT2: string) {
    return (elem: any) => {
        let aux;

        for (let i = 0; i < elem[propArray].length; i++) {
            aux = _.find(table2, (o: any) => o[propT2] === elem[propArray][i]);

            elem[propArray][i] = aux;
        }

        return elem;
    };
}

export function getNanoTime() {
    const hrTime = process.hrtime();
    return (hrTime[0] * 1e9) + hrTime[1];
}

export function validEmail(email: string): boolean {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return mailformat.test(email);
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

export function getPagination(pageSize: number, page: number, list: any[]): types.IPaginatedList {
    if (page > Math.ceil(list.length / pageSize)) {
        return {
            pagination: {
                size: pageSize,
                page,
                total: list.length,
            },
            result: [],
        };
    }

    const [ini, end] = [(page - 1) * pageSize, Math.min(list.length, page * pageSize)];

    return {
        pagination: {
            size: pageSize,
            page,
            total: list.length,
        },
        result: _.slice(list, ini, end),
    };
}
