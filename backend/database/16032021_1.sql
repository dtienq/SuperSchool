-- create table to save favorite course of student
create table favoritecourse (
	favoritecourseid bigserial NOT NULL,
	studentid bigint not null,
	courseid bigint not null,
	CONSTRAINT favoritecourse_pkey PRIMARY KEY (favoritecourseid),
	CONSTRAINT favoritecourse_studentid_foreign FOREIGN KEY (studentid) REFERENCES "user"(userid) ON UPDATE CASCADE ON DELETE cascade,
	CONSTRAINT favoritecourse_courseid_foreign FOREIGN KEY (courseid) REFERENCES course(courseid) ON UPDATE CASCADE ON DELETE CASCADE
);

alter table student_course add column status varchar(20) not null default 'OPEN';

alter table review add column userid bigint not null references "user"(userid) ON UPDATE CASCADE ON DELETE CASCADE;

alter table review alter column rating type float;