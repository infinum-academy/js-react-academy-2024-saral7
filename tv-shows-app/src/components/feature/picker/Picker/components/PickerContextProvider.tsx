import { IShowList } from "@/components/shared/ShowList/ShowList";
import { authFetcher, fetcher } from "@/fetchers/fetcher";
import { IAllShows } from "@/fetchers/shows";
import { swrKeys } from "@/fetchers/swrKeys";
import { IShowCard } from "@/typings/show";
import { createContext, ReactNode, useEffect, useState } from "react";
import useSWR from "swr";

interface IPickerContextProvider {
	children: ReactNode;
}

interface IPickerContext {
	selected: IShowList;
	setSelected: (showList: IShowList) => void;
	active: IShowList;
	setActive: (showList: IShowList) => void;
	winners: IShowList;
	setWinners: (showList: IShowList) => void;
}

export const PickerContext = createContext<IPickerContext>({} as IPickerContext);

export function PickerContextProvider({ children }: IPickerContextProvider) {
	const { data, isLoading, error } = useSWR(swrKeys.shows(""), authFetcher<IAllShows>);
	const [selected, setSelected] = useState<IShowList>({ showList: [] });
	const atOnce = 2;

	const [winners, setWinners] = useState<IShowList>({ showList: [] });
	const [active, setActive] = useState<IShowList>({ showList: [] });

	useEffect(() => {
		if (data) {
			setActive({ showList: data.shows.slice(0, 5) });
		}
	}, [data]);

	if (error) {
		return <div color="white">Something went wrong...</div>;
	}
	if (isLoading || !data) {
		return <div color="white">Loading...</div>;
	}

	return (
		<PickerContext.Provider
			value={{
				selected: selected,
				setSelected: setSelected,
				active: active,
				setActive: setActive,
				winners: winners,
				setWinners: setWinners,
			}}
		>
			{children}
		</PickerContext.Provider>
	);
}
