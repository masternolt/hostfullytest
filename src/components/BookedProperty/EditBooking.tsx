import { usePropertyBookings } from "@/stores/use-property-bookings";
import { CalendarDate, RangeCalendar } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import {
  getLocalTimeZone,
  CalendarDate as RangeDateObject,
} from "@internationalized/date";
import { useRouter } from "next/router";

export type EditBookingProps = {
  propertyId: number;
  bookingId: string;
  startDate: Date;
  endDate: Date;
};

export type RangeDates = {
  start: CalendarDate;
  end: CalendarDate;
};

export const EditBooking: React.FC<EditBookingProps> = ({
  propertyId,
  bookingId,
  startDate,
  endDate,
}) => {
  const [selectedRange, setSelectedRange] = useState<RangeDates | null>(null);
  const createOrUpdateBooking = usePropertyBookings(
    (state) => state.createOrUpdateBooking
  );

  const editBooking = (propertyId: number, bookingId: string) => {
    const selectedDates = selectedRange;

    if (selectedDates) {
      //Format data for store
      const startDate = selectedDates.start.toDate(getLocalTimeZone());
      const endDate = selectedDates.end.toDate(getLocalTimeZone());

      //Submit to store
      try {
        createOrUpdateBooking(propertyId, startDate, endDate, bookingId);
        alert("Booking edit sucessfull!");
      } catch (error) {
        alert(error);
        setSelectedRange(bookedDates);
      }
    }
  };

  const bookedDates = {
    start: new RangeDateObject(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDay()
    ),
    end: new RangeDateObject(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDay()
    ),
  };

  return (
    <>
      <Button
        color="secondary"
        className="disabled:bg-gray-400"
        onClick={() => {
          editBooking(propertyId, bookingId);
        }}
      >
        Book now
      </Button>
      <RangeCalendar
        className="max-w-[284px]"
        value={selectedRange ? selectedRange : bookedDates}
        onChange={setSelectedRange}
      />
    </>
  );
};
