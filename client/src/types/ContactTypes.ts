export interface Contact {
  id: number;
  name: string;
  education?: Education[];
  workExperience?: WorkExperience[];
  profile_photo_url?: string;
  phoneNumber?: string;
  department?: string;
  email?: string;
}

export interface Education {
  id: number;
  institution: string;
  startYear: number;
  endYear: number;
  degree: string;
}

export interface WorkExperience {
  id: number;
  institution: string;
  startYear: number;
  endYear?: number;
  title: string;
}

export interface ContactAPIResponse {
  people: Contact[];
}
