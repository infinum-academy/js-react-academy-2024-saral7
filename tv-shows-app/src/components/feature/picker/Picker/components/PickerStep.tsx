import { useContext } from "react";
import { PickerContext } from "./PickerContextProvider";
import { background, border, Box, Card, CardFooter, Flex, Image, Text } from "@chakra-ui/react";
import { ShowCard } from "@/components/shared/ShowCard/ShowCard";
import ShowList from "@/components/shared/ShowList/ShowList";

export function PickerStep() {
	const { shows, selected, setSelected, currentStep, setCurrentStep, showingAtOnce } = useContext(PickerContext);

	console.log(selected.showList.map((show) => show.title));
	return (
		<Flex
			direction={{ base: "column", md: "row" }}
			wrap={{ base: "nowrap", md: "wrap" }}
			justifyContent="space-around"
			alignContent="space-around"
			gap={1}
			width="100%"
		>
			{shows.showList
				.filter((show, index) => {
					return currentStep * showingAtOnce <= index && index < (currentStep + 1) * showingAtOnce;
				})
				.map((show, index) => {
					const isSelected = selected.showList.find((value) => value === show);

					return (
						<Box
							key={index}
							width={{ base: "100%", md: "40%" }}
							borderRadius={1}
							onClick={() => {
								isSelected
									? setSelected({
											showList: selected.showList.filter((value) => {
												return value !== show;
											}),
										})
									: setSelected({
											showList: [
												...shows.showList.filter((value, index) => {
													return (
														!(currentStep * showingAtOnce <= index && index < (currentStep + 1) * showingAtOnce) &&
														selected.showList.find((x) => x == value)
													);
												}),
												show,
											],
										});
							}}
						>
							<Card height="100%" border={isSelected ? "2px" : 0} borderColor={isSelected ? "green" : "transparent"}>
								<Image display={{ base: "none", md: "block" }} height="80%" src={show.image_url} objectFit="cover" />
								<CardFooter alignContent="space-around">
									<Text flexGrow={1} textAlign="center" color="darkblue" fontWeight="bold">
										{show.title}
									</Text>
								</CardFooter>
							</Card>
						</Box>
					);
				})}
		</Flex>
	);
}
