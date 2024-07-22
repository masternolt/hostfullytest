import { usePropertyBookings } from "@/stores/use-property-bookings";
import Image from "next/image";
import { RangeCalendar } from "@nextui-org/calendar";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { getLocalTimeZone } from "@internationalized/date";
import { Property as PropertyType } from "@/types/property";
import { CalendarDate } from "@nextui-org/react";

export type PropertyProps = {
  property: PropertyType;
};

export type RangeDates = {
  start: CalendarDate;
  end: CalendarDate;
};

export const Property: React.FC<PropertyProps> = ({ property }) => {
  const [selectedRange, setSelectedRange] = useState<RangeDates | null>(null);
  let disabledRanges: any[] = [];

  const createOrUpdateBooking = usePropertyBookings(
    (state) => state.createOrUpdateBooking
  );
  const getProperty = usePropertyBookings((state) => state.getProperty);

  //Submit booking to store, reset component value if successfull, alert only if not
  const submitBooking = (id: number) => {
    const selectedDates = selectedRange;

    if (selectedDates) {
      //Format data for store
      const startDate = selectedDates.start.toDate(getLocalTimeZone());
      const endDate = selectedDates.end.toDate(getLocalTimeZone());

      //Submit to store
      try {
        createOrUpdateBooking(id, startDate, endDate);
        setSelectedRange(null);
        alert("Booking sucessfull!");
      } catch (error) {
        alert(error);
      }
    }
  };

  //Disable available dates at component level if there is any bookings for the current property on store.
  const currentProperty = getProperty(property.id);
  if (currentProperty && currentProperty.bookings.length > 1) {
    disabledRanges = currentProperty.bookings.map((item) => {
      return [item.startDate, item.endDate];
    });
  }

  //Disable dates method
  /*const disableDates = (date) => {
    return disabledRanges.some(
      (interval) =>
        date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
    );
  };*/

  const styles = {
    property:
      "border-2 border-gray-200 rounded-2xl p-4 flex gap-3 hover:shadow-2xl cursor-pointer transition-all flex-col sm:flex-row",
    image: "rounded-2xl sm:min-w-[370px] sm:w-1/4",
    title: "font-semibold",
    infoAndBook:
      "flex sm:flex-row flex-col self-start flex-grow justify-between",
    titleAndDescription: "sm:w-[25%]",
    bookActions: "flex flex-col gap-2 self-end",
  };

  return (
    <div className={styles.property} data-testid="property">
      <Image
        src={property.imageUrl}
        alt={property.title}
        width={250}
        height={250}
        className={styles.image}
      />
      <div className={styles.infoAndBook}>
        <div className={styles.titleAndDescription}>
          <h2 className={styles.title}>{property.title}</h2>
          <h5>Per night: ${property.price}</h5>
        </div>
        <div>
          <ul>
            <li>Some nice amenities</li>
            <li>Some nice amenities</li>
            <li>Some nice amenities</li>
            <li>Some nice amenities</li>
          </ul>
        </div>
        <div className={styles.bookActions}>
          <Button
            color="secondary"
            disabled={selectedRange === null}
            className="disabled:bg-gray-400"
            onClick={() => {
              submitBooking(property.id);
            }}
          >
            Book now
          </Button>
          <RangeCalendar
            className="max-w-[284px]"
            value={selectedRange}
            onChange={setSelectedRange}
          />
        </div>
      </div>
    </div>
  );
};
