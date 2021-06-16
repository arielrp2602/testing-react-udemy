import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { prices } from "../constants";

const OrderDetails = createContext();

// create custom hook to check whether we re inside a provider
export function useOrderDetails() {
	const context = useContext(OrderDetails);

	if (!context) {
		throw new Error(
			"useOrderDetails must be used within an OrderDetailsProvider"
		);
	}

	return context;
}

export function OrderDetailsProvider(props) {
	const [optionCounts, setOptionCounts] = useState({
		scoops: new Map(),
		toppings: new Map(),
	});

	const [totals, setTotals] = useState({
		scoops: 0,
		toppings: 0,
		grandTotal: 0,
	});

	function calculateSubtotal(optionType, optionCounts) {
		let total = 0;
		for (const count of optionCounts[optionType].values()) {
			total += count;
		}

		return total * prices[optionType];
	}

	useEffect(() => {
		const scoops = calculateSubtotal("scoops", optionCounts);
		const toppings = calculateSubtotal("toppings", optionCounts);
		const grandTotal = scoops + toppings;

		setTotals({ scoops, toppings, grandTotal });
	}, [optionCounts]);

	const value = useMemo(() => {
		function updateItemCount(item, count, optionType) {
			const state = { ...optionCounts };
			const optionMap = state[optionType];
			optionMap.set(item, parseInt(count));
			setOptionCounts(state);
		}
		// getter: object containing option count for scoops and toppings, subtotals and totals
		// setter: updateOptionCount

		return [{ ...optionCounts, totals }, updateItemCount];
	}, [optionCounts, totals]);
	return <OrderDetailsProvider value={value} {...props} />;
}
