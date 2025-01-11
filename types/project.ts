import { PortableTextBlock } from "next-sanity";

// ../../types/project.ts
export type Family = {
  _id: string;
  content: PortableTextBlock[]; 
};

export type Project = {
  family: Family;
};

export type Projects = Family[];
