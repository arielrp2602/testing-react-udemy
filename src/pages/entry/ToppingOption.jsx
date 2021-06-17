import { Col, Form, Row } from "react-bootstrap";

const ToppingOption = ({ imagePath, name, updateItemCount }) => {
	function handleChange({ target }) {
		updateItemCount(name, Number(target.checked));
	}

	return (
		<Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
			<img
				alt={`${name} topping`}
				src={`http://localhost:3030/${imagePath}`}
				style={{ width: "75%" }}
			/>
			<Form.Group
				controlId={`${name}-count`}
				as={Row}
				style={{ marginTop: "10px" }}
			>
				<Form.Label column xs={6} style={{ textAlign: "right" }}>
					{name}
				</Form.Label>
				<Col xs={5} style={{ textAlign: "left" }}>
					<Form.Control
						type="checkbox"
						defaultChecked={false}
						onChange={handleChange}
					/>
				</Col>
			</Form.Group>
		</Col>
	);
};

export default ToppingOption;
