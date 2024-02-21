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
    status: string;
    data: Users;
}
type Users = {
    users: IUser[];
};

const url: string = 'https://dummyjson.com/users';

function assertUsers(data: unknown): asserts data is Users {
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
        const { data }: IResponseSuccess = await axios(url);
        assertUsers(data);
        return data.users;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
        }
        return undefined;
    }
}

async function main(): Promise<void> {
    const users = await requestToDummy();
    if (typeof users !== 'undefined') {
        console.log(getAddressFromUser(users[0]));
    }
}
main();
