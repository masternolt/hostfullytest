import { usePropertyBookings } from "@/stores/use-property-bookings";
import { Property } from "../Property/Property";

export const PropertyList: React.FC = ({}) => {
  const properties = usePropertyBookings((state) => state.properties);

  const styles = {
    container: "flex flex-col gap-5",
    property:
      "border-2 border-gray-200 rounded-2xl p-4 flex gap-3 hover:shadow-2xl cursor-pointer transition-all flex-col md:flex-row",
    image: "rounded-2xl md:min-w-[370px]",
    title: "font-semibold",
    infoAndBook:
      "flex md:flex-row flex-col self-start flex-grow justify-between",
    titleAndDescription: "md:w-[25%]",
    bookActions: "flex flex-col gap-2 self-end",
  };

  return (
    <div className={styles.container}>
      {properties.map((property, index) => {
        return <Property property={property} key={index} />;
      })}
    </div>
  );
};
