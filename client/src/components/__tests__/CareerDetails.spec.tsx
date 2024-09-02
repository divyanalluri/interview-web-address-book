import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CareerDetails from '../CareerDetails';
import { Education, WorkExperience } from 'types/ContactTypes';
import { EDUCATION, WORK_EXPERIENCE } from '../../constants/Contact';

describe('CareerDetails Component', () => {
  const educationDetails: Education[] = [{
    "id": 2,
    "institution": "NC State University",
    "startYear": 2001,
    "endYear": 2004,
    "degree": "Bachelor of Computer Science"
  }]
  const workExperience: WorkExperience[] = [{
    "id": 3,
    "institution": "Mega corp",
    "startYear": 2005,
    "endYear": 2009,
    "title": "Software Developer"
  }]

  it('renders no information available message when details array is empty', () => {
    render(<CareerDetails details={[]} about={EDUCATION} />);

    expect(screen.getByText('No Information available to display')).toBeInTheDocument();
  });

  it('renders header based on the about prop', () => {
    render(<CareerDetails details={educationDetails} about={EDUCATION} />);
    expect(screen.getByText('Education')).toBeInTheDocument();

    render(<CareerDetails details={educationDetails} about={WORK_EXPERIENCE} />);
    expect(screen.getByText('Experience')).toBeInTheDocument();
  });

  it('renders education section with provided education data', () => {

    render(<CareerDetails details={educationDetails} about={EDUCATION} />);

    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('NC State University')).toBeInTheDocument();
    expect(screen.getByText('2001 - 2004')).toBeInTheDocument();
    expect(screen.getByText('Bachelor of Computer Science')).toBeInTheDocument();
  });

  it('renders experience section with provided education data', () => {
    render(<CareerDetails details={workExperience} about={WORK_EXPERIENCE} />);

    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Mega corp')).toBeInTheDocument();
    expect(screen.getByText('2005 - 2009')).toBeInTheDocument();
    expect(screen.getByText('Software Developer')).toBeInTheDocument();
  });

  it('renders "Present" when endYear is not passes', () => {
    const { id, institution, startYear, title } = workExperience[0]
    const experience = [{
      id, institution, startYear, title
    }]
    render(<CareerDetails details={experience} about={WORK_EXPERIENCE} />);

    expect(screen.getByText('2005 - Present')).toBeInTheDocument();
  });

});