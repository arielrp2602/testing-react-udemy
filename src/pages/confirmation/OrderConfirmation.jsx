import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
      // in a real app we would get order details from context and send with POST
      axios.post('http://localhost:3030/order')
      .then(({ data }) => setOrderNumber(data.orderNumber))
      .catch(error => console.error(error))
  }, []);

  function handleClick() {
    // clear the order details
    resetOrder();

    // send back to order page
    setOrderPhase('inProgress');
  }

  if(!orderNumber) {
    return (
      <div>
        Loading
      </div>
    )
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Thank You!</h1>
      <p>Your order number is {orderNumber}</p>
      <p style={{ fontSize: '25px' }}>as per our terms and conditions, nothing will happen now</p>
      <Button onClick={handleClick}>Create new order</Button>
    </div>
  )
}

export default OrderConfirmation;