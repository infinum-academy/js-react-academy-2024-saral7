import { IShow, IShowCard } from '@/typings/show';
import { fetcher } from './fetcher';
import { IShowList } from '@/components/shared/ShowList/ShowList';

export interface IAllShows {
	shows: Array<IShowCard>;
}

export function getAllShows() {
	return fetcher<IAllShows>('/api/shows');
}

export function getTopShows() {
	return fetcher<IAllShows>('/api/shows/top-rated');
}

export function getShow(id: string) {
	return fetcher<IShowCard>(`/api/shows/${id}`);
}
