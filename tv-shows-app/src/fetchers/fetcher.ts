export async function fetcher <T> (input: string | URL | globalThis.Request, init?: RequestInit) : Promise<T> {
   try {
      const response = await fetch(input, init);
      if (!response.ok) {
         throw new Error(`Response status: ${response.status}`);
      }
      console.log(response.status);
      const a = await response.json();
      console.log(a);
      return a;
   } catch (error) {
      
      throw new Error(`Response status: ${error}`)
   }
    
}