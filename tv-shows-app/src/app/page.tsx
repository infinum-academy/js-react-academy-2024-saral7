'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { IShow } from "@/typings/show";
import ShowDetails from "./components/feature/shows/ShowDetails/ShowDetails";
import ShowReviewSection from "./components/feature/shows/ShowReviewSection/ShowReviewSection";
import { useEffect, useState } from "react";

const mockShow : IShow = {
  title: 'Brooklyn-99',
  description: `Comedy series following the exploits of Det. Jake Peralta and his diverse, 
               lovable colleagues as they police the NYPD's 99th Precinct.`,
  imageUrl: '/images/brooklyn99.jpg',
  averageRating: 4.5
};

export default function Home() {
  const [show, setShow] = useState(mockShow);

   const updateAverage = (avg : number) => {
      show.averageRating = avg;
      const newShow : IShow = {
         title: show.title,
         description: show.description,
         imageUrl: show.imageUrl,
         averageRating: parseFloat((avg).toFixed(1)) // TODO: da bude 1.0 umjesto 1 ako je cjelobrojno
      }
      setShow(newShow);
   }

  return (
    <main className={styles.main}>
      <ShowDetails show={show}/>
      <ShowReviewSection updateAverage={updateAverage}/>
    </main>
  );
}
