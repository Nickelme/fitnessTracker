let db = require("../models");

module.exports = function(app) {
    app.get("/api/workouts", (req, res) => {
        db.Workout.aggregate([{
                $addFields: {
                    _id: "$_id",
                    day: "$day",
                    totalDuration: {
                        $sum: "$exercises.duration"
                    }
                }
            }

        ], (err, data) => {
            res.json(data);
        });
        // db.Workout.find((err, data) => {
        //     res.json(data);
        // });
    });

    app.get("adas/", (req, res) => {
        if (!req.query.id) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
            return;
        }
        db.Workout.aggregate([{
            $match: {
                _id: req.params.id
            },
            $group: {
                day: "$day",
                totalDuration: {
                    $sum: "$exercise.duration"
                }
            }
        }], (err, data) => {
            res.json(data);
        });
    });

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find((err, data) => {
            res.json(data);
        });
    });

    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.update({
            _id: req.params.id
        }, {
            $push: {
                exercises: req.body
            }
        }, (err, data) => {
            res.json(data);
        });
    });


    app.post("/api/workouts", (req, res) => {
        db.Workout.insertMany([{
            day: new Date()
        }], (err, doc) => {
            res.json(doc[0]);
        });
    });
}