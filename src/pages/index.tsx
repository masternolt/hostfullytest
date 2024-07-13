import { Bookings } from "@/components/Bookings/Bookings";
import { Header } from "@/components/Header/Header";

import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={inter.className}>
      <Header />
      <main className="container mx-auto py-6">
        <Bookings />
      </main>
    </div>
  );
}
