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

class ManualMap {
    private _buckets: IBucket[] = [];

    private stringToHash(key: string) {
        return `${key.length}`.padStart(3, '00').padEnd(6, '001');
    }

    private findBucket(key: string) {
        const hash = this.stringToHash(key);
        const bucket = this._buckets.find((f) => f.hash === hash);
        return bucket;
    }

    set(key: string, value: string | number): void {
        const hash = this.stringToHash(key);
        const item = this._buckets.find((f) => f.hash === hash);
        const bucket: BucketElement = [key, value];
        let message: string;
        if (!item) {
            this._buckets.push({ hash, data: [bucket] });
            message = `Новое значение успешно добавлено и доступно с ключом "${key}"`;
        } else {
            const index = item.data.findIndex(([f]) => f === key);
            if (index >= 0) {
                message = `Значение с ключом "${key}" перезаписано`;
                item.data[index] = bucket;
            } else {
                message = `Значение с ключом "${key}" дописано в bucket`;
                item.data = [...item.data, bucket];
            }
        }
        this.log({ success: true, message });
    }

    get(key: string): BucketElement[] | undefined {
        const bucket = this.findBucket(key);
        return bucket?.data.filter((item) => item[0] === key);
    }
    delete(key: string): void {
        const bucket = this.findBucket(key);
        if (!bucket) {
            this.log({ success: false, message: 'Ключ не найден' });
        } else {
            bucket.data = bucket?.data.filter((item) => item[0] !== key);
        }
        this.log({ success: true, message: `Значение с ключом "${key}" успешно удалено` });
    }
    clear(): void {
        this._buckets = [];
    }
    private log(message: string | Record<string, unknown>): void {
        console.log(message);
    }

    get buckets() {
        return this._buckets;
    }
}

const manualMap = new ManualMap();
manualMap.set('London', 22);
manualMap.set('London', 21);
manualMap.set('Berlin', 22);

console.log(manualMap.get('Berlin'));
manualMap.delete('Berlin');

manualMap.set('San-Diego', 22);

console.log(manualMap.get('Berlin'));

console.log(manualMap.get('London'));
manualMap.delete('London');

console.log(manualMap.get('London'));
manualMap.delete('Berlin');

console.log(manualMap.buckets);
manualMap.clear();
console.log(manualMap.buckets);
