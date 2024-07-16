const apiUrl = "https://tv-shows.infinum.academy";
export const swrKeys = {
   register: `${apiUrl}/users`,
   login: `${apiUrl}/users/sign_in`,
   me: `${apiUrl}/users/me`,
   shows: (path: string) =>`${apiUrl}/shows${path}`,
   getReviews: (id: number) => `${apiUrl}/shows/${id}/reviews`,
   reviews: (path: string) => `${apiUrl}/reviews${path}`
}