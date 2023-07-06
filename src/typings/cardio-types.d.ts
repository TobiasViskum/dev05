interface CardioDataUnparsed {
  id: number;
  uid: Uid;
  name: string;
  discipline: string;
  type: string;
  hours: number;
  minutes: number;
  seconds: number;
  distance: number;
  updated_date: string;
  is_date_locked: number;
  is_closed: number;
  vas: number;
  stroke: string;
  count_in_graph: number;
  group_id: number;
  profile: string;
  group_name: string;
  group_sort_order: number;
  time_amount: string;
  discipline_id: number;
  discipline_name: string;
  is_sprint: number;
  unit_id: number;
  unit_name: string;
  unit_full_name: string;
}

type TimeAmount = {
  hours: number | null;
  minutes: number | null;
  seconds: number | null;
} | null;

interface CardioData {
  id: number;
  uid: Uid;
  name: string;
  discipline: string;
  type: string;
  hours: number;
  minutes: number;
  seconds: number;
  distance: number;
  updated_date: string;
  is_date_locked: number;
  is_closed: number;
  vas: number;
  stroke: string;
  count_in_graph: number;
  group_id: number;
  profile: string;
  group_name: string;
  group_sort_order: number;
  time_amount: TimeAmount;
  discipline_id: number;
  discipline_name: string;
  is_sprint: number;
  unit_id: number;
  unit_name: string;
  unit_full_name: string;
}

interface CardioGroupings {
  group_id: number;
  group_name: string;
  group_sort_order: number;
  profile_group_uid: string;
  discipline_id: number;
}

interface CardioUnits {
  unit_id: number;
  unit_name: string;
  unit_full_name: string;
}
