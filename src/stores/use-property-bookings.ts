import { create } from "zustand";
import { initialPropertiesData } from "./initial-bookings-data";
import { Property } from "@/types/property";
import { Booking } from "@/types/booking";
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { produce } from "immer";

// Provinding mock data that could be a fetch from a service
const initialData = {
  properties : initialPropertiesData
}


export type PropertyState = {
  properties: Property[];
  getProperties: () => Property[];
  getProperty: (id: number) => Property | undefined;
  createOrUpdateBooking: (propertyId: number, startDate: Date, endDate: Date, bookingId?: string) => void;
  deleteBooking: (propertyId: number, bookingId: string) => void;
  hasOverlapedBookings:( bookings: Booking[], startDate: Date, endDate: Date) => Boolean;
  getPropertiesWithBookings:(properties: Property[]) => Property[] | undefined;
}

export const usePropertyBookings = create<PropertyState>((set, get) => ({
  ...initialData,
  getProperties() {
    return get().properties;
  },
  //Get a property
  getProperty(id) {
    const { properties } = get();
  
    const property = properties.find((item) => {
      return item.id === id;
    });

    return property;
  },

  //Create or update bookings state based on the presence of a bookingId
  createOrUpdateBooking(propertyId, proposedStartDate, proposedEndDate, bookingId) {
    const { getProperty, hasOverlapedBookings } = get();
    const property = getProperty(propertyId);

    if (!property) {
      throw new Error("Couldn't find any properties with the provided ID");
    }

    if(property?.bookings.length > 0) {
      const overlappedBooking = hasOverlapedBookings(property.bookings, proposedStartDate, proposedEndDate);
      if (overlappedBooking) {
        throw new Error("One of the proposed dates are in already booked ranges");
      }
    }

    set((state) => ({
      properties: state.properties.map((mapProperty) => {
        if (mapProperty.id === propertyId) {
          // If we have a bookingId, update It
          if (bookingId) {
            return ({
              ...mapProperty,
              bookings: mapProperty.bookings.map(item => item.id === bookingId ? ({ ...item, startDate: proposedStartDate,
                endDate: proposedEndDate }) : item)
            })
          }

          //Otherwise just create a new one
          return ({
            ...mapProperty,
            bookings: [...mapProperty.bookings, {
              id: uuidv4() as string,
              startDate: proposedStartDate,
              endDate: proposedEndDate
            }]
          })
        }
        //If no property is found with that ID, return and go to the next one
        return mapProperty
      }
      ),
    }));

  },
  deleteBooking(propertyId, bookingId) {
    const { getProperty, properties } = get();
    const property = getProperty(propertyId);

    if (!property) {
      throw new Error("Couldn't find any properties with the provided ID");
    }

    set((state) => ({
      properties: properties.map((property) => {
        if(property.id === propertyId) {
          property.bookings = property.bookings.filter(item => item.id !== bookingId)
        }
        return property
      })
    }))

  },
  hasOverlapedBookings(bookings, startDate, endDate) {
    return bookings.every((booking) => {
      return moment(startDate).isBetween(booking.startDate, booking.endDate) || moment(endDate).isBetween(booking.startDate, booking.endDate);
    })
  },
  getPropertiesWithBookings(properties) {

    return properties.filter((item) => {
      return item.bookings.length > 0
    })
  },
}));