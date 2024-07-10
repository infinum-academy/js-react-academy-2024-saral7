import { render, screen } from "@testing-library/react";
import { IShowCard } from "@/typings/show";
import ShowList from "./ShowList";
describe('ShowList', () => {
   const mockShows : IShowCard[] = [
      {
			"id": "106",
			"average_rating": 2,
			"description": "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
			"image_url": "https://picsum.photos/400/600?random=1",
			"no_of_reviews": 4,
			"title": "Stranger Things"
		},
		{
			"id": "107",
			"average_rating": 5,
			"description": "Sheriff Deputy Rick Grimes wakes up from a coma to learn the world is in ruins and must lead a group of survivors to stay alive.",
			"image_url": "https://picsum.photos/400/600?random=2",
			"no_of_reviews": 0,
			"title": "The Walking Dead"
		},
		{
			"id": "107",
			"average_rating": 5,
			"description": "Sheriff Deputy Rick Grimes wakes up from a coma to learn the world is in ruins and must lead a group of survivors to stay alive.",
			"image_url": "https://picsum.photos/400/600?random=2",
			"no_of_reviews": 0,
			"title": "The Walking Dead"
		}
   ]
   it('should check if all shows are rendered', () => {
      render(<ShowList showList={mockShows}/>)

      const showList = screen.getByTestId('show-list') as HTMLElement;
      //showList.childNodes.forEach(x => console.log(x));
      expect(showList.childNodes.length).toBe(mockShows.length); // TODO: proci po djeci i vidjeti pase li svaki
      
   });
});