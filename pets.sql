DROP TABLE IF EXISTS pets;


CREATE TABLE pets(
    id serial,
    name text,
    kind text,
    age integer
);

INSERT INTO pets (name, kind, age) VALUES('Jim', 'Snake', 46);
INSERT INTO pets (name, kind, age) VALUES('Freddy', 'Turkey', 7);
INSERT INTO pets (name, kind, age) VALUES('Kelly', 'Komodo', 24);
INSERT INTO pets (name, kind, age) VALUES('Austin', 'Dog', 2);