# GYM


## Backup:
* mongoexport -d exercise -c workouts -f _id,exercise.name,exercise._id,repeat,weight --type=csv -o workout.csv
* mongoimport -d exercise -c workouts --type=csv --headerline --file=workout.csv


## Restore
* mongodump
* mongorestore --db exercise ./dump/exercise


# Mongodb
* db.workouts.update({}, {$set:{"deleted":false}}, false, true)