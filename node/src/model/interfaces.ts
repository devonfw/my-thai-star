export interface OrderView {
    [index: number] :  DishView;
}
/*
export interface DishView {
    orderName: string;
    orderDescription: string;
    price: number;
    image: string;
    options: Array<ExtraView>
    likes: number;
    favourite: boolean;
}*/


export interface DishView{
	id:number;
	name:string;
	description:string;
	price: number;
	image: string;
	extras: ExtraView[];
	favourite: FavouriteView;
	tweet:Array<TweetView>;
}

interface ImageView {
    name: string;
    content: string;
    type: ImageType;
    extension: string;
}

enum ImageType { BINARY, URL }

export interface ExtraView {
    name: string;
    price: number;
    selected: boolean;
}

export interface ReservationView {
    event: Event;
    email: string;
    adults: number;
    kids: number;
    invitationNumber: number;
}

export interface InvitationView {
    event: Event;
    nameOwner: string;
    emailOwner: string;
    friends: Array<string>;
    invitationNumber: number;
}

export interface Event {
    name: string;
    date: string;
    hour: string;
}

export interface Error{
    code: number;
    message: string;
}

export interface Reservation {
	date: string;
	type: ReservationType;
	name: string;
	email: string;
	assistants: number;
	guestList: string[];
}

export interface ReservationType{
	name: string;
	value: number;
}


export interface OrderView{
	lines: Array<OrderLineView>;
	invitation: string;
}

export interface OrderLineView{
	dish: DishView;
	extras: Array<ExtraView>;
	amount: number;
	comment: string;
}



export interface CategoryView{
	id:number;
	name: string;
	description:string;
	group: number;
	selected: boolean;
	order: number;
}

export interface FavouriteView{
	isFav: boolean;
	likes: number;
}

enum ImageType {Binary=0,Url}

export interface TweetView{
    prueba: string;
}

