/*
    Домашнее задание - Классы
    Написать на TypeScript реализацию Map в виде класса. То есть:
    -   Класс Map с методами: set, get, delete, clear
    -   Хранить данные в buckets, hash которых рассчитывать по какой-то логике
    -   Если hash одинаков, элементы backet связываются друг с другом
*/

type BucketElement = [string, string | number];
interface IBucket {
    hash: string;
    data: BucketElement[];
}

interface IResultMessage {
    success: boolean;
    message: string;
}
class ManualMap {
    private buckets: IBucket[] = [];

    private stringToHash(key: string) {
        return `${key.length}`.padStart(3, '00').padEnd(6, '001');
    }

    private findBucket(key: string) {
        const hash = this.stringToHash(key);
        const bucket = this.buckets.find((f) => f.hash === hash);
        return bucket;
    }

    set(key: string, value: string | number): IResultMessage {
        const hash = this.stringToHash(key);
        const item = this.buckets.find((f) => f.hash === hash);
        const bucket: BucketElement = [key, value];
        let message: string;
        if (!item) {
            this.buckets.push({ hash, data: [bucket] });
            message = `Новое значение успешно добавлено и доступно с ключом "${key}"`;
        } else {
            const index = item.data.findIndex(([f]) => f === key);
            if (index >= 0) {
                message = `Значение с ключом "${key}" перезаписано`;
                item.data[index] = bucket;
            } else {
                message = `Значение с ключом "${key}" дописано в bucket`;
            }
            item.data = [...item.data, bucket];
        }
        return { success: true, message };
    }

    get(key: string): BucketElement[] | undefined {
        const bucket = this.findBucket(key);
        return bucket?.data.filter((item) => item[0] !== key);
    }
    delete(key: string): IResultMessage {
        const bucket = this.findBucket(key);
        console.log(bucket);
        if (!bucket) {
            return { success: false, message: 'Ключ не найден' };
        } else {
            bucket.data = bucket?.data.filter((item) => item[0] !== key);
        }
        return { success: true, message: `Значение с ключом "${key}" успешно удалено` };
    }
    clear(): void {
        this.buckets = [];
    }
    get log(): IBucket[] {
        return this.buckets;
    }
}

const manualMap = new ManualMap();
console.log(manualMap.set('London', 22));
console.log(manualMap.set('London', 21));
console.log(manualMap.set('London', 22));
console.log(manualMap.set('Berlin', 22));
console.log(manualMap.set('San-Diego', 22));
console.log(manualMap.get('London'));

console.log(manualMap.set('London', 22));
manualMap.set('Berlin', 22);

console.log(manualMap.log);
console.log(manualMap.delete('Berlin'));
console.log(manualMap.log);

console.log(manualMap.delete('Berlin'));
console.log(manualMap.log);
