export class Product extends Realm.Object {
    static schema = {
        name: 'Product',
        primaryKey: 'id',
        properties: {
            id: 'string',
            category: 'string',
            image: 'string',
            barcod: 'string',
            name: 'string',
            price: 'string',
            count: 'int',
        },
    };
}

export class Company extends Realm.Object {
    static schema = {
        name: 'Company',
        primaryKey: 'companyId',
        properties: {
            companyId: 'string',
            companyName: 'string',
            products: 'Product[]',
        },
    };
}
