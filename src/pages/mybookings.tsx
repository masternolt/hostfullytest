import { BookedProperty } from "@/components/BookedProperty/BookedProperty";
import { usePropertyBookings } from "@/stores/use-property-bookings";

export default function Mybookings() {
  const getPropertiesWithBookings = usePropertyBookings(
    (state) => state.getPropertiesWithBookings
  );
  const properties = usePropertyBookings((state) => state.properties);

  const propertiesWithBookings = getPropertiesWithBookings(properties);

  const styles = {
    container: "flex flex-col",
  };

  return (
    <div className="container">
      {propertiesWithBookings && propertiesWithBookings?.length > 0 ? (
        <div className={styles.container}>
          {propertiesWithBookings.map((item, index) => {
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
