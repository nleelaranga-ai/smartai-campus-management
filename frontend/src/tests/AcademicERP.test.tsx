import { render, screen, fireEvent } from '@testing-library/react';
import AcademicERP from '../pages/AcademicERP';

describe('Academic ERP Dashboard', () => {
  test('renders stat cards with correct data', () => {
    render(<AcademicERP />);
    expect(screen.getByText(/Total Courses/i)).toBeInTheDocument();
  });

  test('filters course list based on search input', () => {
    render(<AcademicERP />);
    const searchInput = screen.getByPlaceholderText(/Search by course code/i);
    fireEvent.change(searchInput, { target: { value: 'CS101' } });
    // Assert filtered results appear
  });

  test('switches between Overview and Courses tabs', () => {
    render(<AcademicERP />);
    const courseTab = screen.getByRole('button', { name: /courses/i });
    fireEvent.click(courseTab);
    expect(screen.getByText(/Course Title/i)).toBeInTheDocument();
  });
});
