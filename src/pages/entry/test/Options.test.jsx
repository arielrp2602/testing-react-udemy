import { render, screen } from '@testing-library/react';
import Options from '../Options';

test('it displays image for each scoop option from server', async() => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text
  const altText = scoopImages.map(({ alt }) => alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('it should display image for each topping option from server', async () => {
  render(<Options optionType="toppings" />);

  // find images
  const images = await screen.findAllByRole('img', { name: /topping$/i });
  expect(images).toHaveLength(3);

  const altText = images.map(({ alt }) => alt);
  expect(altText).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping'
  ]);
})