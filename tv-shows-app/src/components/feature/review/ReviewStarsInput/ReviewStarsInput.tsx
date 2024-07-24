import { StarIcon } from "@chakra-ui/icons";
import { Flex, Text, useStyleConfig } from "@chakra-ui/react";

export interface IReviewStarsInputProps {
	label: string;
	value: number;
	onChange: (index: number) => void;
}

export default function ReviewStarsInput({ label, value, onChange }: IReviewStarsInputProps) {
	return (
		<Flex alignItems={"center"}>
			<Text fontSize={{ base: 5, sm: 3 }} color={"white"} marginRight="8px">
				{label}
			</Text>
			{Array(5)
				.fill(0)
				.map((x, index) => {
					return (
						<StarIcon
							key={index}
							boxSize={{ base: "16px", sm: "24px" }}
							color={index < value ? "white" : "lightblue"}
							onClick={() => {
								onChange(index + 1);
							}}
						/>
					);
				})}
		</Flex>
	);
}
