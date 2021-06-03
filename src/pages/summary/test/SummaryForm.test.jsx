import {
	render,
	screen,
	waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

	userEvent.click(checkbox);
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

	userEvent.click(checkbox);
	expect(checkbox).toBeChecked();
	expect(button).toBeEnabled();

	userEvent.click(checkbox);
	expect(checkbox).not.toBeChecked();
	expect(button).toBeDisabled();
});

test("Popover responds to hover", async () => {
	render(<SummaryForm />);

	// Popover is hidden when app starts
	const hiddenPopover = screen.queryByText(
		/no ice cream will actually be delivered/i
	);

	expect(hiddenPopover).not.toBeInTheDocument();

	// Popover appears upon mousover of checkbox label
	const termsAndConditions = screen.getByText(/terms and conditions/i);

	userEvent.hover(termsAndConditions);

	const popover = screen.getByText(/no ice cream will actually be delivered/i);
	expect(popover).toBeInTheDocument();

	// Popover disappears when we mouse out
	userEvent.unhover(termsAndConditions);

	await waitForElementToBeRemoved(() =>
		screen.queryByText(/no ice cream will actually be delivered/i)
	);
});
