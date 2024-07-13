const apiUrl = "https://tv-shows.infinum.academy";
export const swrKeys = {
   register: `${apiUrl}/users`,
   login: `${apiUrl}/users/sign_in`,
   me: `${apiUrl}/users/me`,
   shows: (id?: string) => id ? `${apiUrl}/shows/${id}` : `${apiUrl}/shows`
}