import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { Button } from "react-bootstrap";

const OrderEntry = ({ setOrderPhase}) => {
	const [orderDetails] = useOrderDetails();

  function handleClick() {
    setOrderPhase('review');
  }

	return (
		<div>
			<h1>Design your sundae!</h1>
			<Options optionType="scoops" />
			<Options optionType="toppings" />
			<h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button onClick={handleClick}>Order Sundae!</Button>
		</div>
	);
};

export default OrderEntry;
