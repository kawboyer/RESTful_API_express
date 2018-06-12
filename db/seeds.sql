USE outline_db;

INSERT INTO nodes(id, node_name, node_range_start, node_range_end, node_children, created_at)
VALUES (1, 'Parent One', 12, 2, 50, '2018-06-10 12:58:40');

INSERT INTO subitems(id, subitems_no, created_at)
VALUES(1,15, '2018-06-10 12:58:40');

INSERT INTO subitems(id, subitems_no, created_at)
VALUES(1, 2, '2018-06-10 12:58:40');

INSERT INTO subitems(id, subitems_no, created_at)
VALUES(1, 24, '2018-06-10 12:58:40');

INSERT INTO subitems(id, subitems_no, created_at)
VALUES(1, 29, '2018-06-10 12:58:40');

INSERT INTO subitems(id, subitems_no, created_at)
VALUES(1, 41, '2018-06-10 12:58:40');