DROP TABLE IF EXISTS workout CASCADE;
DROP TABLE IF EXISTS workout_exercise CASCADE;
DROP TABLE IF EXISTS exercise CASCADE;
DROP TABLE IF EXISTS sets CASCADE;

CREATE TABLE workout(
    id serial PRIMARY KEY,
    date DATE 
);

CREATE TABLE exercise(
    id serial PRIMARY KEY,
    name text
);

CREATE TABLE workout_exercise(
    id serial PRIMARY KEY,
    -- workout_id integer NOT NULL,
    -- exercise_id int NOT NULL,
    workout_id INT REFERENCES workout(id) ON DELETE CASCADE,
    exercise_id INT REFERENCES exercise(id) ON DELETE CASCADE
    -- FOREIGN KEY (workout_id) REFERENCES workout(id),
    -- FOREIGN KEY (exercise_id) REFERENCES exercise(id)
);

CREATE TABLE sets(
    id serial PRIMARY KEY,
    reps integer,
    weight integer,
    duration integer,
    exercise_id INT REFERENCES exercise(id) ON DELETE CASCADE,
    workout_exercise_id INT REFERENCES workout_exercise(id) ON DELETE CASCADE
    -- exercise_id int NOT NULL,
    -- workout_exercise_id int NOT NULL,
    -- FOREIGN KEY (exercise_id) REFERENCES exercise(id),
    -- FOREIGN KEY (workout_exercise_id) REFERENCES workout_exercise(id)
);

