import { usePropertyBookings } from "@/stores/use-property-bookings";
import { Property as PropertyType } from "@/types/property";
import { CalendarDate } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/router";
import { EditBooking } from "./EditBooking";

export type BookedProps = {
  property: PropertyType;
};

export type RangeDates = {
  start: CalendarDate;
  end: CalendarDate;
};

export const BookedProperty: React.FC<BookedProps> = ({ property }) => {
  const deleteBooking = usePropertyBookings((state) => state.deleteBooking);
  const router = useRouter();

  const styles = {
    container: "flex flex-col",
    heading: "font-semibold text-3xl mb-3",
    bookings: "flex justify-between",
  };

  const onDeleteBooking = (propertyId: number, bookingId: string) => {
    deleteBooking(propertyId, bookingId);
    router.reload();
  };

  return (
    <div>
      <h1 className={styles.heading}>You bookings at: {property.title}</h1>
      <div>
        {property.bookings.map((booking, index) => {
          return (
            <div
              className={styles.bookings}
              key={`property-${property.title}-booking-${index}`}
            >
              <div>
                <p>
                  <b>Start date:</b> {booking.startDate.toLocaleDateString()}
                </p>
                <p>
                  <b>End date:</b> {booking.endDate.toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col text-center">
                <b>Edit booking</b>
                <EditBooking
                  propertyId={property.id}
                  bookingId={booking.id}
                  startDate={booking.startDate}
                  endDate={booking.endDate}
                />
              </div>
              <div>
                <Button
                  color="danger"
                  onClick={() => {
                    onDeleteBooking(property.id, booking.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
