/*
    Необходимо написать функцию, 
    которая удаляет все ключи из первого объекта, 
    которые есть во втором объекте

    в git создать папку: 9-difference
*/

interface IA {
    a: number;
    b: string;
    c?: boolean;
    d?: number;
    e?: boolean;
}

interface IB {
    a?: number;
    b?: string;
    c?: boolean;
    d?: number;
    e?: boolean;
}

type IDifference = Omit<IA, keyof IB>; // Pick<IA, Exclude<keyof IA, keyof IB>>
type IReduce<T> = {
    [key: string]: T;
};
type key = number | string | symbol;
function diff<T extends Record<key, any>, K extends Record<key, any>>(a: T, b: K): IDifference {
    return Object.entries(a)
        .filter(([f]) => !Object.keys(b).includes(f))
        .reduce((map, item) => {
            const [key, value] = item;
            return { ...map, ...{ [key]: value } };
        }, {}) as IDifference;
}

let a0: IA = { a: 10, b: 'str', d: 5, e: true };
let b0: IB = { a: 10, c: true };
const v0 = diff(a0, b0);
console.log(v0);

let a1: IA = { a: 10, b: 'str', d: 5, e: true };
let b1: IB = { c: true, e: true };
const v1 = diff(a1, b1);
console.log(v1);
