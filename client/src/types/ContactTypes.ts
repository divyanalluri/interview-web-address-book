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
    institution: string;
    startYear: number;
    endYear: number;
    degree: string;
  }
  
  export interface WorkExperience {
    institution: string;
    startYear: number;
    endYear?: number;
    title: string;
  }
  
  export interface APIResponse {
    people: Contact[];
  }
  
  export interface APIError {
    message: string;
  }
  