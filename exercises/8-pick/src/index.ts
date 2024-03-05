/*
    Написать функцию получения нужных данных из объектов
    В git создать папку: 8-pick
*/
interface IUser {
    name: string;
    age: number;
    skills: string[];
    roles: string[];
}

const user: IUser = {
    name: 'Vasiliy',
    age: 8,
    skills: ['typescript', 'javascript'],
    roles: ['new', 'admin'],
};

type key = string | symbol | number;
interface IReduce<T> {
    [key: key]: T;
}
function pickObjectKeys<T extends Record<key, any>>(user: T, pattern: Array<keyof T>): IReduce<T> {
    return pattern.reduce((result: IReduce<T>, item) => {
        const currentItem = user[item];
        result[item] = currentItem;
        return result;
    }, {});
}

const res = pickObjectKeys(user, ['age', 'roles']);
console.log(res);
