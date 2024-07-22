import { mutator } from '@/fetchers/mutators';
import LoginForm, { ILoginForm } from './LoginForm';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { swrKeys } from '@/fetchers/swrKeys';

jest.mock('@/fetchers/mutators', () => {
	return {
		mutator: jest.fn().mockResolvedValue(null),
	};
});

describe('LoginForm', () => {
	const params: ILoginForm = {
		password: '12345678',
		email: 'name.surmane@gmail.com',
	};

	it('should call mutator on submit with appropriate props', async () => {
		render(<LoginForm />);

		const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
		fireEvent.change(emailInput, { target: { value: params.email } });

		const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
		fireEvent.change(passwordInput, { target: { value: params.password } });

		const submitButton = screen.getByTestId('submit-button');
		act(() => {
			submitButton.click();
		});

		await waitFor(() => {
			expect(mutator).toHaveBeenCalledWith(swrKeys.login, { arg: params });
		});
	});

	it('should render error message is email is not given', async () => {
		render(<LoginForm />);

		const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;

		const submitButton = screen.getByTestId('submit-button');
		act(() => {
			submitButton.click();
		});
		const emailError = await screen.findByTestId('email-error-message');

		await waitFor(() => {
			expect(emailError).toBeInTheDocument();
		});
	});

	it('should render error message is password is not given', async () => {
		render(<LoginForm />);

		const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;

		const submitButton = screen.getByTestId('submit-button');
		act(() => {
			submitButton.click();
		});
		const passwordError = await screen.findByTestId('password-error-message');

		await waitFor(() => {
			expect(passwordError).toBeInTheDocument();
		});
	});

	// kako da vidjeti da se nesto asinkrono ne dogodi
	/*
   it('should not render error message is email is given', async () => {
      render(<LoginForm />);

      const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
      fireEvent.change(emailInput, {target: {value: mockEmail}})

      const submitButton = screen.getByTestId('submit-button');
      act(() => {
         submitButton.click();
      });
      
      
      await waitFor(async () => {
         expect(await screen.findByTestId('email-error-message')).not.toBeInTheDocument();
      });
   })
   */
});
