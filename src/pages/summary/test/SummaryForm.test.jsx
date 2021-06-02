import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("Checkbox is unchecked by default", () => {
	render(<SummaryForm />);

	const checkbox = screen.getByRole("checkbox", {
		name: /I agree to terms and conditions/i,
	});

	expect(checkbox).not.toBeChecked();
});

test("Button is enabled when checkbox is checked", () => {
	render(<SummaryForm />);

	const button = screen.getByRole("button", {
		name: /confirm order/i,
	});
	const checkbox = screen.getByRole("checkbox", {
		name: /I agree to terms and conditions/i,
	});

	fireEvent.click(checkbox);
	expect(checkbox).toBeChecked();
	expect(button).toBeEnabled();
});

test("Button is disabled if checkbox unchecked", () => {
	render(<SummaryForm />);

	const button = screen.getByRole("button", {
		name: /confirm order/i,
	});
	const checkbox = screen.getByRole("checkbox", {
		name: /I agree to terms and conditions/i,
	});

	expect(checkbox).not.toBeChecked();
	expect(button).toBeDisabled();

	fireEvent.click(checkbox);
	expect(checkbox).toBeChecked();
	expect(button).toBeEnabled();

	fireEvent.click(checkbox);
	expect(checkbox).not.toBeChecked();
	expect(button).toBeDisabled();
});
