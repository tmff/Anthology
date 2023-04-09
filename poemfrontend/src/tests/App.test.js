import { render, screen , cleanup} from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

test('test for the tests', () => {
  expect(true).toBe(true);
});
