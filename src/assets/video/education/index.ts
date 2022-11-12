// Video
import CNCMachine from './CNCMachine.mp4';
import JQueryCode from './JQueryCode.mp4';
import StudentProgrammer from './StudentProgrammer.mp4';
// Poster
import PosterCNCMachine from '../../image/education/PosterCNCMachine.webp';
import PosterJQueryCode from '../../image/education/PosterJQueryCode.webp';
import PosterStudentProgrammer from '../../image/education/PosterStudentProgrammer.webp';

const videoEducation: { name: string; src: string; poster: string }[] = [
  {
    name: 'PolytechnicCollege',
    src: CNCMachine,
    poster: PosterCNCMachine,
  },
  {
    name: 'Skillbox',
    src: JQueryCode,
    poster: PosterJQueryCode,
  },
  {
    name: 'TechnicalUniversity',
    src: StudentProgrammer,
    poster: PosterStudentProgrammer,
  },
];

export default videoEducation;
