interface FitnessData {
  id: number;
  uid: Uid;
  name: string;
  max: number;
  reps: number;
  updated_date_max: Date | null;
  has_reps: number;
  has_max: number;
  updated_date_reps: Date | null;
  group_id_max: number | null;
  is_competing: number;
  unit_id: number;
  group_id_reps: number | null;
  notes_max: string | null;
  notes_reps: string | null;
  reps_range_id: number | null;
  vas_reps: number;
  vas_max: number;
  is_date_locked: number;
  show_vas_fitness: number;
  unit_name: string;
  group_name_max: string | null;
  group_name_reps: string | null;
  reps_range_name: string | null;
  profile: string;
}
