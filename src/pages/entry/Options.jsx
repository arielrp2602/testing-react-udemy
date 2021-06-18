import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import { AlertBanner } from "../../common";
import { prices } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";

const Options = ({ optionType }) => {
	const [items, setItems] = useState([]);
	const [error, setError] = useState(false);
	const [orderDetails, updateItemCount] = useOrderDetails();

	useEffect(() => {
		axios
			.get(`http://localhost:3030/${optionType}`)
			.then((res) => setItems(res.data))
			.catch(() => setError(true));
	}, [optionType]);

	if (error) {
		return <AlertBanner />;
	}

	const Component = optionType === "scoops" ? ScoopOption : ToppingOption;

	const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
	const options = items.map((item) => (
		<Component
			key={item.name}
			updateItemCount={(itemName, newItemCount) =>
				updateItemCount(itemName, newItemCount, optionType)
			}
			{...item}
		/>
	));

	return (
		<>
			<h2>{title}</h2>
			<p>{prices[optionType]} each</p>
			<p>
				{title} total: {orderDetails.totals[optionType]}
			</p>
			<Row>{options}</Row>
		</>
	);
};

export default Options;
