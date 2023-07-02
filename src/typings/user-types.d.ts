interface ProfilesNoJoin {
  id: number;
  name: string;
  mail: string;
  uid: Uid;
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
  uid: Uid;
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
  group_uid: Uid;
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
  uid: Uid;
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
  group_uid: Uid;
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
