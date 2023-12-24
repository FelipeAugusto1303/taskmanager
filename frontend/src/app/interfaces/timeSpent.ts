export interface TimeSpent {
  timeSpent_id: string;
  timeSpent_comment: string;
  timeSpent_timeSpent: number;
  timeSpent_spentAt: string;
}

export interface CreateTimeSpent {
  id?: string;
  timeSpent: number;
  spentAt: string;
  comment: string;
  task?: string;
}
