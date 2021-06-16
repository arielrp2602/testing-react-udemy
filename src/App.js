import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetails } from "./contexts/OrderDetails";

function App() {
	return (
		<Container>
			<OrderDetails.Provider>
				{/* Summary page and entry page need provider */}
				<OrderEntry />
			</OrderDetails.Provider>
			{/* Confirmation page does not need provider */}
		</Container>
	);
}

export default App;
