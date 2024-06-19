import Dexie, { type EntityTable } from 'dexie';

export interface ICacheLearning {
    id: number;
    data: string;
}

const db = new Dexie('IDBExampleCacheLearning') as Dexie & {
    cacheLearning: EntityTable<
        ICacheLearning,
        'id'
    >;
};

db.version(1).stores({
    cacheLearning: '++id, data'
});

export { db };