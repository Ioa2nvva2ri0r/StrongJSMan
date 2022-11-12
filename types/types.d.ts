type activeSection = {
  paths: string[];
  path: string;
};

type DataAbilities = { title: string; abbr: string; data: [] }[];

type DataEducation = {
  name: string;
  institution: string;
  specialization: string;
  speciality: string;
  start: number;
  ending: number | string;
}[];

type DataProjects = {
  path: { online: string; source: string };
  projects: { title: string; online: boolean; stack: string[] }[];
};

type DataContacts = {
  title: string;
  group: string;
  data: { name: string; href: string; value?: string }[];
}[];
