import Image from "next/image";
import styles from "./page.module.css";
import { IShow } from "@/typings/show";
import ShowDetails from "./components/feature/shows/ShowDetails/ShowDetails";

const mockShow : IShow = {
  title: 'Brooklyn-99',
  description: `Comedy series following the exploits of Det. Jake Peralta and his diverse, 
               lovable colleagues as they police the NYPD's 99th Precinct.`,
  imageUrl: '/images/brooklyn99.jpg',
  averageRating: 4.5
};

export default function Home() {
  return (
    <main className={styles.main}>
      <ShowDetails show={mockShow}/>

    </main>
  );
}
