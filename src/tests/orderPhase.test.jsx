import { render, screen } from '@testing-library/react'; 
import userEvent from '@testing-library/user-event';
import App from '../App';

test('order phases for happy path', async() => {
  // render the app
  render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', { name: ' Vanilla '});
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '2')

  const chocoInput = screen.findByRole('spinbutton', { name: 'Chocolate' });
  userEvent.clear(chocoInput);
  userEvent.type(chocoInput, '1');

  const hotFudge = await screen.findByRole('checkbox', { name: 'Hot fudge' });
  userEvent.click(hotFudge)

  // find and click order button
  const orderButton = screen.getByRole('button', { name: /confirm order/i });;
  userEvent.click(orderButton);

  // check summary information based on order
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary '});
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00 '});
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole('heading', { name: 'Toppings:  $1.50 '});
  expect(toppingsHeading).toBeInTheDocument();
  
  // check summary option items
  expect(screen.getByText('2 Vanilla')).toBeInTheDocument()
  expect(screen.getByText('1 Chocolate')).toBeInTheDocument()
  expect(screen.getByText('Hot Fudge')).toBeInTheDocument()
  
  // accept terms and conditions and click button to confirm order
  const tcCheck = screen.getByRole('checkbox', { name: /terms and conditions/i });
  userEvent.click(tcCheck);

  const confirmButton = screen.getByRole('button', { mame: /confirm order/i });
  userEvent.click(confirmButton);

  // confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole('heading', { name: /thank you/i });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: /new order/i });
  userEvent.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsTotal).toBeInTheDocument();

  const toppingsTotal = screen.getByText('Toppings total: $0.00');
  expect(toppingsTotal).toBeInTheDocument();

  // do we need to await anything to avoid test errors?
});