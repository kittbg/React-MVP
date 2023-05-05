INSERT INTO workout (date) VALUES ('2022-01-01');
INSERT INTO workout (date) VALUES ('2022-01-02');
INSERT INTO workout (date) VALUES ('2022-01-03');

INSERT INTO exercise (name) VALUES ('pullups');
INSERT INTO exercise (name) VALUES ('dips');
INSERT INTO exercise (name) VALUES ('squats');

INSERT INTO workout_exercise (workout_id, exercise_id) VALUES (1, 1);
INSERT INTO workout_exercise (workout_id, exercise_id) VALUES (1, 1);
INSERT INTO workout_exercise (workout_id, exercise_id) VALUES (1, 2);
INSERT INTO workout_exercise (workout_id, exercise_id) VALUES (2, 1);
INSERT INTO workout_exercise (workout_id, exercise_id) VALUES (2, 3);
INSERT INTO workout_exercise (workout_id, exercise_id) VALUES (3, 2);
INSERT INTO workout_exercise (workout_id, exercise_id) VALUES (3, 3);

INSERT INTO sets (reps, weight, duration, exercise_id, workout_exercise_id) VALUES (10, 100, 60, 1, 1);
INSERT INTO sets (reps, weight, duration, exercise_id, workout_exercise_id) VALUES (8, 50, 60, 1, 2);
INSERT INTO sets (reps, weight, duration, exercise_id, workout_exercise_id) VALUES (10, 50, 45, 2, 3);
INSERT INTO sets (reps, weight, duration, exercise_id, workout_exercise_id) VALUES (10, 200, 90, 3, 5);
