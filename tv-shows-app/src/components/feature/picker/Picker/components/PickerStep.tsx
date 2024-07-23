import { useContext } from "react";
import { PickerContext } from "./PickerContextProvider";
import { background, border, Box, Card, CardFooter, Flex, Image, Text } from "@chakra-ui/react";
import { ShowCard } from "@/components/shared/ShowCard/ShowCard";
import ShowList from "@/components/shared/ShowList/ShowList";

export function PickerStep() {
	const { selected, setSelected, winners, setWinners, active, setActive } = useContext(PickerContext);

	console.log(selected.showList.map((show) => show.title));
	console.log(
		"winners: ",
		winners.showList.map((show) => show.title)
	);
	console.log(
		"active",
		active.showList.map((show) => show.title)
	);
	console.log(
		"selected",
		selected.showList.map((show) => show.title)
	);

	if (active.showList.length < 2) {
		console.log("skippao ", active.showList);
		setActive({ showList: [...winners.showList, ...active.showList] });
		setWinners({ showList: [] });
		setSelected({ showList: [] });
	}
	return (
		<Flex
			direction={{ base: "column", md: "row" }}
			wrap={{ base: "nowrap", md: "wrap" }}
			justifyContent="space-around"
			alignContent="space-around"
			gap={1}
			width="100%"
		>
			{active.showList
				.filter((show, index) => {
					return index < 2;
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
											showList: [],
										})
									: setSelected({
											showList: [show],
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
