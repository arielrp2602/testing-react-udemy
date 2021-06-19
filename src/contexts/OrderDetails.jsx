import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { prices } from "../constants";
import { formatCurrency } from "../utils";

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

function calculateSubtotal(optionType, optionCounts) {
	let total = 0;
	for (const count of optionCounts[optionType].values()) {
		total += count;
	}

	return total * prices[optionType];
}

export function OrderDetailsProvider(props) {
	const [optionCounts, setOptionCounts] = useState({
		scoops: new Map(),
		toppings: new Map(),
	});

	const zeroCurrency = formatCurrency(0);

	const [totals, setTotals] = useState({
		scoops: zeroCurrency,
		toppings: zeroCurrency,
		grandTotal: zeroCurrency,
	});

	useEffect(() => {
		const scoops = calculateSubtotal("scoops", optionCounts);
		const toppings = calculateSubtotal("toppings", optionCounts);
		const grandTotal = scoops + toppings;

		setTotals({
			scoops: formatCurrency(scoops),
			toppings: formatCurrency(toppings),
			grandTotal: formatCurrency(grandTotal),
		});
	}, [optionCounts]);

	const value = useMemo(() => {
		function updateItemCount(item, count, optionType) {
			const state = { ...optionCounts };
			const optionMap = optionCounts[optionType];
			optionMap.set(item, parseInt(count));
			setOptionCounts(state);
		}
		// getter: object containing option count for scoops and toppings, subtotals and totals
		// setter: updateOptionCount

    function resetOrder() {
      setOptionCounts({
        scoops: new Map(),
        toppings: new Map(),
      })
    }

		return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
	}, [optionCounts, totals]);

	return <OrderDetails.Provider value={value} {...props} />;
}
