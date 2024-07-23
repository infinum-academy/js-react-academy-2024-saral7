import { IShowList } from "@/components/shared/ShowList/ShowList";
import { authFetcher, fetcher } from "@/fetchers/fetcher";
import { IAllShows } from "@/fetchers/shows";
import { swrKeys } from "@/fetchers/swrKeys";
import { IShowCard } from "@/typings/show";
import { createContext, ReactNode, useState } from "react";
import useSWR from "swr";

interface IPickerContextProvider {
	children: ReactNode;
}

interface IPickerContext {
	shows: IShowList;
	selected: IShowList;
	setSelected: (showList: IShowList) => void;
	currentStep: number;
	setCurrentStep: (step: number) => void;
	showingAtOnce: number;
	lastStep: number;
}

export const PickerContext = createContext<IPickerContext>({} as IPickerContext);

export function PickerContextProvider({ children }: IPickerContextProvider) {
	const { data, isLoading, error } = useSWR(swrKeys.shows(""), authFetcher<IAllShows>);
	const [selected, setSelected] = useState<IShowList>({ showList: [] });
	const [currentStep, setCurrentStep] = useState<number>(0);
	const atOnce = 4;

	if (error) {
		return <div color="white">Something went wrong...</div>;
	}
	if (isLoading || !data) {
		return <div color="white">Loading...</div>;
	}

	return (
		<PickerContext.Provider
			value={{
				shows: { showList: data.shows },
				selected: selected,
				setSelected: setSelected,
				currentStep: currentStep,
				setCurrentStep: setCurrentStep,
				showingAtOnce: atOnce,
				lastStep: data.shows.length / atOnce - (data.shows.length % atOnce == 0 ? 1 : 0),
			}}
		>
			{children}
		</PickerContext.Provider>
	);
}
