import { LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FormHelperText, Input, InputGroup, InputLeftElement, InputProps, InputRightElement } from "@chakra-ui/react";
import { forwardRef, useState } from "react";

export default forwardRef(function PasswordInput({ ...rest }: InputProps, ref) {
	const [isClicked, setIsClicked] = useState(false);

	const onClickHandler = () => {
		setIsClicked(!isClicked);
	};
	return (
		<InputGroup display="flex" flexDirection="column" alignContent="left">
			<InputLeftElement>
				<LockIcon color="white" />
			</InputLeftElement>
			<Input ref={ref} {...rest} type={isClicked ? "text" : "password"} color="white" placeholder="Password" />
			<InputRightElement>
				{isClicked ? (
					<ViewIcon color="white" onClick={onClickHandler} />
				) : (
					<ViewOffIcon color="white" onClick={onClickHandler} />
				)}
			</InputRightElement>
		</InputGroup>
	);
});
