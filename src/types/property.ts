import { Booking } from "./booking";

export type Property = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    bookings?: Booking[];
    rating: number;
    distanceFromCentre: number;
    city: string;
}