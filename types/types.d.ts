interface activeSection {
  paths: string[];
  path: string;
}
// Source
interface SourceImage {
  name: string;
  logo: JSX.Element;
  images: string[];
}
interface SourceVideo {
  name: string;
  src: string;
  poster: string;
}
interface SourceDiplomas {
  name: string;
  data: { name: string; href: string }[];
}
// Data
type DataAbout = string[];
type DataAbilities = { title: string; abbr: string; lang?: string; data: [] }[];
interface DataEducation {
  name: string;
  institution: string;
  specialization: string;
  speciality: string;
  start: number;
  ending: number | string;
  video?: SourceVideo;
  diplomas?: SourceDiplomas;
}
interface OProject {
  name: string;
  online: boolean;
  stack: string[];
  source?: SourceImage;
}
type DataProjects = {
  path: { online: string; source: string };
  projects: OProject[];
};
type DataContacts = {
  title: string;
  group: string;
  data: { name: string; href: string; value?: string }[];
}[];
