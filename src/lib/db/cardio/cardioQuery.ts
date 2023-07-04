export const cardioQuery =
  "SELECT a.*, b.group_id, b.group_name, b.group_sort_order, c.*, d.* FROM cardio_stat_table AS a LEFT JOIN cardio_grouping AS b ON a.group_id=b.group_id LEFT JOIN cardio_disciplines AS c ON a.discipline_id=c.discipline_id LEFT JOIN cardio_units AS d ON a.unit_id=d.unit_id";
