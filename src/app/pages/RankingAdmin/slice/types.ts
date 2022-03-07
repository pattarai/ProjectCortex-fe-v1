/* --- STATE --- */

export interface Factor {
  factorId: number;
  factorName: string;
  maxScore: number;
  phase: number;
}

export interface Ranking {
  factor: Factor;
  userId: number;
  score: number;
  users: {
    firstName: string;
    lastName: string;
  };
}

export interface RankingAdminState {
  factors: Array<Factor>;
  ranking: Array<Ranking>;
}
