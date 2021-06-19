import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const SummaryForm = ({ setOrderPhase}) => {
	const [tcChecked, setTcChecked] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setOrderPhase('completed');
  }

	const popover = (
		<Popover id="popover-basic">
			<Popover.Content>No ice cream will actually be delivered</Popover.Content>
		</Popover>
	);

	const checkboxLabel = (
		<span>
			I agree to
			<OverlayTrigger placement="top" overlay={popover}>
				<span style={{ color: "blue" }}>Terms and Conditions</span>
			</OverlayTrigger>
		</span>
	);

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="terms-and-conditions">
				<Form.Check
					type="checkbox"
					checked={tcChecked}
					onChange={(e) => setTcChecked(e.target.checked)}
					label={checkboxLabel}
				/>
			</Form.Group>

			<Button variant="primary" type="submit" disabled={!tcChecked}>
				Confirm Order
			</Button>
		</Form>
	);
};

export default SummaryForm;
