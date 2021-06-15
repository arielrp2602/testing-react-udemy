import { Alert } from 'react-bootstrap';

const defaultMessage = 'An unexpected error ocurred. Please try again later.';
const defaultVariant = 'danger';

const AlertBanner = ({ message = defaultMessage, variant = defaultVariant }) => {
  return <Alert variant={variant} children={message} style={{ backgroundColor: 'red' }} />
};

export default AlertBanner;