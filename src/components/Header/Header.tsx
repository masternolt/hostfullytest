"use client";
import { HeaderLinks } from "../HeaderLinks.tsx/HeaderLinks";
import Image from "next/image";

export const Header: React.FC = ({}) => {
  const styles = {
    container: "border-b-[1px] border-black",
    subContainer: "container flex justify-between py-4 mx-auto",
    logoAndHeading: "flex items-center",
    heading: "ml-2 font-semibold",
  };

  return (
    <header className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.logoAndHeading}>
          <Image
            src="/assets/logo.svg"
            width={25}
            height={25}
            alt="Test logo"
          />
          <h1 className={styles.heading}> Bookings test</h1>
        </div>

        <HeaderLinks />
      </div>
    </header>
  );
};
