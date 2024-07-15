import { create } from "zustand";
import { initialPropertiesData } from "./initial-bookings-data";
import { Property } from "@/types/property";

// Provinding mock data that could be a fetch from a service
const initialData = {
  properties : initialPropertiesData
}


export type PropertyState = {
  properties: Property[];
  getProperties: () => Property[];
  getProperty: (id: number) => Property | undefined;
  createOrUpdateBooking: (id: number, startDate: Date, endDate: Date, bookingId?: number) => void;
  deleteBooking: (propertyId: number, bookingId: number) => void;
}

export const usePropertyBookings = create<PropertyState>((set, get) => ({
  ...initialData,
  getProperties() {
    return get().properties;
  },
  getProperty(id) {
    const { properties } = get();
  
    const property = properties.find((item) => {
      return item.id === id;
    });

    return property;
  },
  createOrUpdateBooking(id, startDate, endDate, bookingId) {

  },
  deleteBooking(propertyId, bookingId) {

  }
}));