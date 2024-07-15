"use client";
import Link from "next/link";

export const HeaderLinks: React.FC = ({}) => {
  const styles = {
    container: "flex items-center justify-between min-w-[25%] font-semibold",
    link: "active:bg-purple-600 active:text-white rounded-2xl py-3 px-2 hover:bg-purple-600 hover:text-white",
  };

  return (
    <ul className={styles.container}>
      <li>
        <Link href={"/"} className={styles.link}>
          Home
        </Link>
      </li>
      <li>
        <Link href={"/bookings"} className={styles.link}>
          My bookings
        </Link>
      </li>
    </ul>
  );
};
