interface ProfilesNoJoin {
  id: number;
  name: string;
  mail: string;
  uid: string;
  profile_group_id: number;
  is_reps_default: number;
  is_text_centered: number;
  language: string;
  show_vas_fitness: number;
  show_vas_cardio: number;
  is_animations_enabled: number;
  favorites: string | null;
  role: string;
  password: string;
  most_visited: string | null;
}

interface ProfileDataBefore {
  id: number;
  name: string;
  mail: string;
  uid: string;
  profile_group_id: number;
  is_reps_default: number;
  is_text_centered: number;
  language: string;
  show_vas_fitness: number;
  show_vas_cardio: number;
  is_animations_enabled: number;
  fitness_app: number;
  hund_app: number;
  cardio_app: number;
  compete_app: number;
  greetings_statement: string;
  description_statement: string;
  chat_app: number;
  greetings_statement_danish: string;
  description_statement_danish: string;
  last_name: string;
  favorites: string | null;
  role: string;
  password: string;
  most_visited: string | null;
  available_apps: string | null;
  color_theme: string;
  group_uid: string;
  group_name: string;
  group_password: string;
}

type Favorites = { [key: string]: string } | null;
type MostVisited = { [key: string]: number } | null;
type AvailableApps = string[] | null;

interface ProfileData {
  id: number;
  name: string;
  mail: string;
  uid: string;
  profile_group_id: number;
  is_reps_default: number;
  is_text_centered: number;
  language: string;
  show_vas_fitness: number;
  show_vas_cardio: number;
  is_animations_enabled: number;
  fitness_app: number;
  hund_app: number;
  cardio_app: number;
  compete_app: number;
  greetings_statement: string;
  description_statement: string;
  chat_app: number;
  greetings_statement_danish: string;
  description_statement_danish: string;
  last_name: string;
  favorites: Favorites;
  role: string;
  password: string;
  most_visited: MostVisited;
  available_apps: AvailableApps;
  color_theme: string;
  group_uid: string;
  group_name: string;
  group_password: string;
}

interface AppData {
  id: number;
  name_id: string;
  name: string;
  category: string;
  color: string;
  href: string;
}

interface FitnessData {
  id: number;
  uid: string;
  name: string;
  max: number;
  reps: number;
  updated_date_max: Date | null;
  has_reps: number;
  has_max: number;
  updated_date_reps: Date | null;
  group_id_max: null;
  is_competing: number;
  unit_id: number;
  group_id_reps: number;
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
