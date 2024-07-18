import { BookedProperty } from "@/components/BookedProperty/BookedProperty";
import { usePropertyBookings } from "@/stores/use-property-bookings";

export default function Mybookings() {
  const getPropertiesWithBookings = usePropertyBookings(
    (state) => state.getPropertiesWithBookings
  );
  const bookedProperties = getPropertiesWithBookings();
  console.log(bookedProperties);

  const styles = {
    container: "flex flex-col",
  };

  return (
    <div className="container">
      {bookedProperties && bookedProperties?.length > 0 ? (
        <div className={styles.container}>
          {bookedProperties.map((item, index) => {
            return <BookedProperty property={item} key={index} />;
          })}
        </div>
      ) : (
        <h1>
          You have no booked properties, go back to the index page a book some.
        </h1>
      )}
    </div>
  );
}
