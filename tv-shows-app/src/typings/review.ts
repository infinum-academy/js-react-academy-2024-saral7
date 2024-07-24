import { IUser } from "./user"

export interface IReview {
   id?: string,
   comment: string,
   rating: number,
   show_id: number,
   user?: IUser
}

export interface IReviewItem {
   review: IReview
}

export interface IReviewList {
   reviews: Array<IReview>,
   meta: any
}