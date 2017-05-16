export class BookingInfo {
    date: string;
    hour: string;
    creationDate: string;
    creationHour: string;
    nameOwner: string;
    emailOwner: string;
    reservationId: number;
    adults?: number;
    kids?: number;
    friends?: string[];
}
