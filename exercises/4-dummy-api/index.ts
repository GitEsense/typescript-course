import axios from 'axios';

enum Gender {
    Male = 'male',
    Female = 'female',
}
enum Color {
    Green = 'Green',
    Brown = 'Brown',
    Gray = 'Gray',
    Amber = 'Amber',
    Blue = 'Blue',
    Black = 'Black',
    Blond = 'Blond',
    Chestnut = 'Chestnut',
    Auburn = 'Auburn',
}
enum HairType {
    Strands = 'Strands',
    Curly = 'Curly',
    Very_curly = 'Very curly',
    Straight = 'Straight',
    Wavy = 'Wavy',
}

interface IHair {
    color: Color;
    type: HairType;
}
interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: Gender;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: Color;
    hair: IHair;
    domain: string;
    ip: string;
    address: IAddress;
    macAddress: string;
    university: string;
    bank: IBank;
    company: ICompany;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: ICrypto;
}
interface ICrypto {
    coin: string;
    wallet: string;
    network: string;
}
interface ICompany {
    address: IAddress;
    department: string;
    name: string;
    title: string;
}
interface IBank {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}
interface ICoordinates {
    lat: number;
    lng: number;
}
interface IAddress {
    address: string;
    city: string;
    coordinates: ICoordinates;
    postalCode: string;
    state: string;
}
interface IResponseSuccess {
    status: number;
    data: IDataSuccess;
}

interface IResponseFailed {
    status: number;
    data: IDataFailed;
}
interface IDataSuccess {
    users: IUser[];
}
interface IDataFailed {
    status: number;
    statusText: string;
}
type Res = IResponseSuccess | IResponseFailed;

const url: string = 'https://dummyjson.com/users';

function errorHandler(error: unknown) {
    if (error instanceof Error) {
        return error.message;
    }
    return 'this error not instanceof Error\nerror: ' + error;
}

function isSuccessResponse(res: Res): res is IResponseSuccess {
    if (res.status === 200) {
        return true;
    }
    return false;
}

function getUsersFromData(res: Res): IUser[] {
    if (isSuccessResponse(res)) {
        assertUsers(res.data);
        return res.data.users;
    } else {
        throw new Error(res.data.statusText);
    }
}

function assertUsers(data: unknown): asserts data is IDataSuccess {
    if (typeof data === 'object' && !!data && 'users' in data) {
        return;
    }
    throw new Error('users not found');
}

function getAddressFromUser(user: IUser): IAddress | never {
    if (user.address) {
        return user.address;
    }
    throw new Error('address from user not found');
}

async function requestToDummy(): Promise<IUser[] | undefined> {
    try {
        const response: IResponseSuccess = await axios(url);
        const users = getUsersFromData(response);
        return users;
    } catch (error) {
        throw new Error(errorHandler(error));
    }
}

async function main(): Promise<void> {
    try {
        const users = await requestToDummy();
        console.log(users);
    } catch (error) {
        console.log(errorHandler(error));
    }
}

main();
