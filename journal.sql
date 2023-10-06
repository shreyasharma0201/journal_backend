CREATE DATABASE toddle_app;

CREATE TABLE journal(
    j_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    contents TEXT NOT NULL,
    published_at TIMESTAMP NOT NULL DEFAULT NOW()
    published_by INTEGER FOREIGN KEY REFERENCES teacher(t_id),
);

CREATE TABLE teacher(
    t_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    email VARCHAR(25) NOT NULL,
    password VARCHAR(25) NOT NULL,
    token VARCHAR(255) NOT NULL
);

CREATE TABLE student(
    s_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    email VARCHAR(25) NOT NULL,
    password VARCHAR(25) NOT NULL,
    token VARCHAR(255) NOT NULL
);
ALTER TABLE `tagged` DROP FOREIGN KEY `tagged_ibfk_1`; ALTER TABLE `tagged` ADD CONSTRAINT `tagged_ibfk_1` FOREIGN KEY (`J_id`) REFERENCES `journal`(`j_id`) ON DELETE CASCADE ON UPDATE RESTRICT;
CREATE TABLE tagged( tag_id INTEGER PRIMARY KEY AUTO_INCREMENT, J_id INTEGER NOT NULL, 
FOREIGN KEY(J_id) REFERENCES journal(j_id), S_id INTEGER NOT NULL, FOREIGN KEY(S_id) REFERENCES student(s_id) );

ALTER TABLE tagged ADD CONSTRAINT fk_foreign_key_2 FOREIGN KEY (S_id) REFERENCES student(s_id);

insert into journal (title, contents, published_by) values("newclass", "new class starts", 1);

insert into tagged(J_id, S_id) values(2, 1);

`INSERT INTO student (name, email, password)
        SELECT * FROM (SELECT ?, ?, ?) AS tmp
        WHERE NOT EXISTS (
            SELECT email FROM student WHERE email=?
        ) LIMIT 1;`

ALTER TABLE `tagged` DROP FOREIGN KEY `fk_foreign_key_1`; ALTER TABLE `tagged` ADD CONSTRAINT `fk_foreign_key_1` 
FOREIGN KEY (`J_id`) REFERENCES `journal`(`j_id`) ON DELETE CASCADE ON UPDATE RESTRICT;
