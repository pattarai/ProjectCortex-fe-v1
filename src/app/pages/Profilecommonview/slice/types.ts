/* --- STATE --- */
export interface ProfileCommonView {
  name: string;
  committee: string;
  project: string;
}

export interface ProfileCommonViewState extends Array<ProfileCommonView> {}
