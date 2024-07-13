export async function mutator<T>(url : string, { arg }: { arg: T }) {
   const response = await fetch(url, {
     method: 'POST',
     body: JSON.stringify(arg),
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     }
   })

    if (!response.ok) {
      const error = await response.json()
      throw error;
    }
    const obj = await response.json();
    return {
      ...obj,
      'uid': response.headers.get('uid'),
      'client': response.headers.get('client'),
      'token': response.headers.get('access-token')
    }
 }