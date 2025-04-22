import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
// curl request flask
// curl -X POST http://127.0.0.1:5000/predict -H "Content-Type: application/json" -d "{\"Time\": 100, \"V1\": 0.1, \"V2\": 0.2, \"V3\": 0.3, \"V4\": 0.4, \"V5\": 0.5, \"V6\": 0.6, \"V7\": 0.7, \"V8\": 0.8, \"V9\": 0.9, \"V10\": 0.1, \"V11\": 0.2, \"V12\": 0.3, \"V13\": 0.4, \"V14\": 0.5, \"V15\": 0.6, \"V16\": 0.7, \"V17\": 0.8, \"V18\": 0.9, \"V19\": 1.0, \"V20\": 1.1, \"V21\": 1.2, \"V22\": 1.3, \"V23\": 1.4, \"V24\": 1.5, \"V25\": 1.6, \"V26\": 1.7, \"V27\": 1.8, \"V28\": 1.9, \"Amount\": 200}"
//curl request backend
//curl -X POST http://localhost:8081/auth/register -H "Content-Type: application/json" -d "{\"username\": \"newuser\", \"password\": \"password123\", \"email\": \"newuser@example.com\"}"
