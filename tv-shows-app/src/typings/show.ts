export interface IShow {
   title: string,
   description: string,
   averageRating?: number,
   imageUrl?: string
};

export interface IShowCard {
   id: string,
   title: string,
   description: string,
   average_rating: number,
   image_url?: string,
   no_of_reviews?: number
}