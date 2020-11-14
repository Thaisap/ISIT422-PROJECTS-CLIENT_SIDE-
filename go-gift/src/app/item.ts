export interface Item{
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