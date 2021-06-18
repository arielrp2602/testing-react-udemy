import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Option from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
	render(<Option optionType="scoops" />);

	// make sure total starts out $0.00
	const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
	expect(scoopSubtotal).toHaveTextContent("0.00");

	// update vanilla scoops to 1 and check the subtotal
	const vanillaInput = await screen.findByRole("spinbutton", {
		name: "Vanilla",
	});
	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, "1");
	expect(scoopSubtotal).toHaveTextContent("2.00");

	// update chocolate scoops to 2 and check the subtotal
	const chocolateInput = await screen.findByRole("spinbutton", {
		name: "Chocolate",
	});
	userEvent.clear(chocolateInput);
	userEvent.type(chocolateInput, "2");
	expect(scoopSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
	render(<Option optionType="toppings" />);

	// total starts at $0.00
	const toppingSubtotal = screen.getByText("Toppings total: $", {
		exact: false,
	});
	expect(toppingSubtotal).toHaveTextContent("0.00");

	// update cherries toppings to 1 and check the subtotal
	const vanillaCheck = await screen.findByRole("checkbox", {
		name: "Cherries",
	});
	expect(vanillaCheck).not.toBeChecked();
	userEvent.click(vanillaCheck);
	expect(toppingSubtotal).toHaveTextContent("1.50");

	// un check cherries and check subtotal
	userEvent.click(vanillaCheck);
	expect(toppingSubtotal).toHaveTextContent("0.00");

	const mmsCheck = await screen.findByRole("checkbox", { name: "M&Ms" });
	userEvent.click(mmsCheck);
	userEvent.click(vanillaCheck);
	expect(toppingSubtotal).toHaveTextContent("3.00");

	const hotFudgeCheck = await screen.findByRole("checkbox", {
		name: "Hot fudge",
	});
	userEvent.click(hotFudgeCheck);
	expect(toppingSubtotal).toHaveTextContent("4.5");

	userEvent.click(vanillaCheck);
	expect(toppingSubtotal).toHaveTextContent("3.00");

	userEvent.click(mmsCheck);
	expect(toppingSubtotal).toHaveTextContent("1.5");

	userEvent.click(hotFudgeCheck);
	expect(toppingSubtotal).toHaveTextContent("0.00");
});

describe("grand total", () => {
	test("updates properly if scoop is added first", async () => {
		render(<OrderEntry />);

		const grandTotal = screen.getByRole("heading", { name: /grand total:/i });
		expect(grandTotal).toHaveTextContent("0.00");

		const vanillaInput = await screen.findByRole("spinbutton", {
			name: "Vanilla",
		});
		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, "1");

		expect(grandTotal).toHaveTextContent("2.00");

		const hotFudge = await screen.findByRole("checkbox", {
			name: "Hot fudge",
		});
		userEvent.click(hotFudge);

		expect(grandTotal).toHaveTextContent("3.5");
	});

	test("updates properly if topping is added first", async () => {
		render(<OrderEntry />);

		const grandTotal = screen.getByRole("heading", { name: /grand total:/i });
		expect(grandTotal).toHaveTextContent("0.00");

		const mms = await screen.findByRole("checkbox", { name: "M&Ms" });
		userEvent.click(mms);

		expect(grandTotal).toHaveTextContent("1.50");

		const chocolateInput = await screen.findByRole("spinbutton", {
			name: "Chocolate",
		});
		userEvent.clear(chocolateInput);
		userEvent.type(chocolateInput, "3");

		expect(grandTotal).toHaveTextContent("7.50");
	});

	test("updates properly if item is removed", async () => {
		render(<OrderEntry />);

		const grandTotal = screen.getByRole("heading", { name: /grand total:/i });
		expect(grandTotal).toHaveTextContent("0.00");

		const vanillaInput = await screen.findByRole("spinbutton", {
			name: "Vanilla",
		});
		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, "4");

		expect(grandTotal).toHaveTextContent("8.00");

		const cherries = await screen.findByRole("checkbox", { name: "Cherries" });
		userEvent.click(cherries);

		expect(grandTotal).toHaveTextContent("9.50");

		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, "3");

		expect(grandTotal).toHaveTextContent("7.50");

		userEvent.click(cherries);

		expect(grandTotal).toHaveTextContent("6.0");
	});
});
