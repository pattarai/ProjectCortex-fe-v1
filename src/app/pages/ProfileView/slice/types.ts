/* --- STATE --- */
export interface ProfileView {
  dp: string;
  name: string;
  project: string;
  committee: string;
  description: string;
  position: string;
  github: string;
  linkedin: string;
  expert: string;
  email: string;
  address: string;
  phone: string;
  rollno: string;
  year: string;
  department: string;
  college: string;
  positionst: string;
  topskills: string;
  passion: string;
}

export interface ProfileViewState extends Array<ProfileView> {}
