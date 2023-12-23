export interface TimeSpent {
  timeSpent_comment: string;
  timeSpent_timeSpent: number;
  timeSpent_spentAt: string;
}

export interface CreateTimeSpent {
  timeSpent: number;
  spentAt: string;
  comment: string;
  task: string;
}
