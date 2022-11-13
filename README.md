# GYM


## Backup:
* mongoexport -d exercise -c workouts -f _id,exercise.name,exercise._id,repeat,weight --type=csv -o workout.csv
* mongoimport -d exercise -c workouts --type=csv --headerline --file=workout.csv


## Restore
* mongodump
* mongorestore --db exercise ./dump/exercise

## nodemon
* screen -ls
* screen -S myname
* screen -S myname -X quit
* screen -r myname
* ctrl+a d: detach

# Mongodb
* db.workouts.update({}, {$set:{"deleted":false}}, false, true)
* db.workouts.deleteMany({deleted:true});