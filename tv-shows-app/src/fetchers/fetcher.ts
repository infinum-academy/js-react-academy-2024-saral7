export async function fetcher<T>(input: string | URL | globalThis.Request, init?: RequestInit): Promise<T> {
	try {
		const response = await fetch(input, init);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const a = await response.json();
		return a;
	} catch (error) {
		throw new Error(`Response status: ${error}`);
	}
}

export async function authFetcher<T>(input: string | URL | globalThis.Request, init?: RequestInit): Promise<T> {
	let data;
	try {
		const value = localStorage.getItem('loginInfo');
		const authInfo = value ? JSON.parse(value) : {};
		const response = await fetch(input, {
			...init,
			headers: {
				Client: authInfo.client,
				'Access-token': authInfo.token,
				Uid: authInfo.uid,
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			if (response.status == 401) {};
			throw response;
		}
		if (response.status !== 204) {
			data = await response.json();
		}
	} catch (error) {
		throw error;
	}
	return data;
}
