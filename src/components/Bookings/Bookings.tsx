import { usePropertyBookings } from "@/stores/use-property-bookings";
import Image from "next/image";
import { DatePicker } from "@nextui-org/date-picker";

export const Bookings: React.FC = ({}) => {
  const properties = usePropertyBookings((state) => state.properties);

  const styles = {
    container: "flex flex-col gap-5",
    property:
      "bg-gray-200 rounded-2xl p-4 flex gap-3 hover:shadow-2xl cursor-pointer transition-all",
    image: "rounded-2xl",
    title: "font-semibold",
  };

  return (
    <div className={styles.container}>
      {properties.map((property, index) => {
        return (
          <div key={index} className={styles.property}>
            <Image
              src={property.imageUrl}
              alt={property.title}
              width={250}
              height={250}
              className={styles.image}
            />
            <div>
              <h2 className={styles.title}>{property.title}</h2>
              <h5>Per night: ${property.price}</h5>
              <DatePicker label="Birth date" className="max-w-[284px]" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
