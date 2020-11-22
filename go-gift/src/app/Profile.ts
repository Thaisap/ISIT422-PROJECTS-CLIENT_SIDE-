export interface Profile {
    _id: string;
    firstName: string;
    lastName: string;

    email: string;
    bio: string;
    profileImg:string;
    tag: string [];
    wishlist: string [];
    friend: string [];
}


export interface ProfileWithImg{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    profileImg: unknown;
    tag: string [];
    wishlist: string [];
    friend: string [];
}
