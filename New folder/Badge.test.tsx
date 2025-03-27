import { render, screen } from '@testing-library/react';
import Badge from './Badge';
import '@testing-library/jest-dom';

describe('Badge Component', () => {
    test('renders badge with content', () => {
        render(<Badge content="5" />);
        expect(screen.getByText('5')).toBeInTheDocument();
    });
    
    test('renders badge with max count display', () => {
        render(<Badge content={120} maxCount={99} />);
        expect(screen.getByText('120')).toBeInTheDocument();
    });

    test('renders badge without content (dot style)', () => {
        render(<Badge />);
        expect(document.querySelector('.badge-dot')).toBeInTheDocument();
    });

    test('renders badge with children', () => {
        render(
            <Badge content={5}>
                <span>Child Element</span>
            </Badge>
        );
        expect(screen.getByText('Child Element')).toBeInTheDocument();
    });
});
