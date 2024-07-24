"use client";

import AuthRedirect from "@/components/shared/AuthRedirect/AuthRedirect";
import { IShowList } from "@/components/shared/ShowList/ShowList";
import { authFetcher, fetcher } from "@/fetchers/fetcher";
import { IAllShows } from "@/fetchers/shows";
import { swrKeys } from "@/fetchers/swrKeys";
import { IShowCard } from "@/typings/show";
import { Box } from "@chakra-ui/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import useSWR from "swr";

interface IPickerContextProvider {
	children: ReactNode;
}

interface IPickerContext {
	shows: IShowList;
	selected: IShowList;
	setSelected: (showList: IShowList) => void;
	active: IShowList;
	setActive: (showList: IShowList) => void;
	winners: IShowList;
	setWinners: (showList: IShowList) => void;
	currentStep: number;
	setCurrentStep: (step: number) => void;
	totalSteps: number;
}

export const PickerContext = createContext<IPickerContext>({} as IPickerContext);

export function PickerContextProvider({ children }: IPickerContextProvider) {
	const { data, isLoading, error } = useSWR(swrKeys.shows(""), authFetcher<IAllShows>);
	const [selected, setSelected] = useState<IShowList>({ showList: [] });
	const [currentStep, setCurrentStep] = useState(1);
	const [totalSteps, setTotalSteps] = useState(0);
	const [winners, setWinners] = useState<IShowList>({ showList: [] });
	const [active, setActive] = useState<IShowList>({ showList: [] });

	useEffect(() => {
		if (data) {
			setActive({ showList: data.shows });
			setWinners({ showList: [] });
			setWinners({ showList: [] });
			setCurrentStep(1);

			let remaining = data.shows.length;
			let steps = 0;
			while (remaining > 1) {
				steps += (remaining - (remaining % 2)) / 2;
				remaining = (remaining + (remaining % 2)) / 2;
			}
			setTotalSteps(steps);
		}
	}, [data]);

	if (error) {
		if (error.status !== 401) return <Box color="white">Something went wrong...</Box>;
	}
	if (isLoading) {
		return <div color="white">Loading...</div>;
	}

	return (
		<>
			{!data && <AuthRedirect to="/login" condition="isLoggedOut" />}
			{data && (
				<PickerContext.Provider
					value={{
						shows: { showList: data.shows },
						selected: selected,
						setSelected: setSelected,
						active: active,
						setActive: setActive,
						winners: winners,
						setWinners: setWinners,
						totalSteps: totalSteps,
						currentStep: currentStep,
						setCurrentStep: setCurrentStep,
					}}
				>
					{children}
				</PickerContext.Provider>
			)}
		</>
	);
}
