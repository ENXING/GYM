# GYM

# Mongodb
## Update
* db.workouts.update({}, {$set:{"deleted":false}}, false, true)
* db.workouts.deleteMany({deleted:true});
*  
```mongodb
db.workouts.find({}, {_id: 1}).forEach(
  function(i) {
    db.users.updateOne(
      {name: "EnxingXiong"}, 
      {$push: {"workout": i._id} }
    );
    }
  );
```

## Backup:
* mongoexport -d exercise -c workouts -f _id,exercise.name,exercise._id,repeat,weight --type=csv -o workout.csv
* mongoimport -d exercise -c workouts --type=csv --headerline --file=workout.csv



## Restore
* mongodump
* mongorestore --db exercise ./dump/exercise

# nodemon
* screen -ls
* screen -S myname
* screen -S myname -X quit
* screen -r myname
* ctrl+a d: detach



# nginx:
## setting
```
server {
listen 80 default_server;
server_name _;
return 301 https://$host$request_uri;
}
server {
listen              443 ssl;
ssl_certificate  /root/.acme.sh/workoutreport.ga/fullchain.cer;
ssl_certificate_key /root/.acme.sh/workoutreport.ga/workoutreport.ga.key;
ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
root /var/www/html;
index index.html index.htm index.nginx-debian.html;
server_name _;
location /api {
proxy_pass http://localhost:10201;
}
location / {
proxy_pass http://localhost:10203;
index index.html;
}
}
```
* blockPort.sh $(grep -e ":[0-9]\{1,5\}" /etc/nginx/sites-enabled/default |grep " *[^#]proxy_pass"|sed -r 's/[^0-9]//g' |tr '\n' ' ')
* watch tail /var/log/nginx/access.log

## troubleshooting
* 
```
Simple location prefix matching works for this without using a rewrite rule as long as you specify a URI in the proxy_pass directive:

location /foo {
  proxy_pass http://localhost:3200/;
}
Notice the additional / at the end of the proxy_pass directive. NGINX will strip the matched prefix /foo and pass the remainder to the backend server at the URI /. Therefore, http://myserver:80/foo/bar will post to the backend at http://localhost:3200/bar.
```
* /etc/nginx/sites-available
* apache
    * /var/log/apache2/access.log
    * watch tail cat /var/log/apache2/access.log
## firewall block port from other source except localhost
* 
```bash
iptables -A INPUT -p tcp -s localhost --dport 10201 -j ACCEPT
iptables -A INPUT -p tcp --dport 10201  -j DROP
```

## build env
* create config.js in "server" folder with "server.js"
  * 
  ```
  module.exports = {
    jwtSecretKey: "123456"
  }
  ```