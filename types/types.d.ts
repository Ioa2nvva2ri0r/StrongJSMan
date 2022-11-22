type Lang = 'en' | 'ru';
type KeyObj<K, T> = {
  [key in readonly K]: T;
};

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

// About
type DataAbout = string[];
// Abilities
interface OSkill {
  skill: string | KeyObj<Lang, string>;
  stars: number;
  parent?: string;
  child?: OSkill[];
}
interface OSubSkill {
  subtitle: string | KeyObj<Lang, string>;
  skills: OSkill[];
}
type DataAbilities = {
  title: string;
  abbr: string;
  data: OSkill[] | OSubSkill[];
}[];
// Education
interface DataEducation {
  name: string;
  institution: KeyObj<lang, string>;
  specialization: KeyObj<lang, string>;
  speciality: KeyObj<lang, string>;
  start: string;
  ending: string;
  video?: SourceVideo;
  diplomas?: SourceDiplomas;
}
// Projects
interface OProject {
  name: string;
  online: boolean;
  stack: string[];
  source?: SourceImage;
}
interface DataProjects {
  path: { online: string; source: string };
  projects: OProject[];
}
// Contacts
type DataContacts = {
  title: KeyObj<lang, string>;
  group: string;
  data: { name: string; href: string; value?: string }[];
}[];
