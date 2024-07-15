export interface IReview {
   email?: string,
   avatar?: string,
   rating: number,
   text: string
}

export interface IReviewItem {
   review: IReview
}

export interface IReviewList {
   reviewList: Array<IReview>
}