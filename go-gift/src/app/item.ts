export interface Item{
    _id: string;
    itemName: string;
    vendor: string;
    price: string;
    image: string;
    url: string;
}

export interface WriteItemDoc{
    itemName: string;
    vendor: string;
    price: string;
    image: string;
    url: string;
    tag: string[];
}

export interface EmailDoc{
    to: string;
}