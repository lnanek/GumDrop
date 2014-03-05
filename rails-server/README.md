
DigitalMarketPlace
-----------------------
### Development 
Download MongoDb
* Download mongodb from http://www.mongodb.org/downloads
* Extract and cd into the directory.
* run ./bin/mongod --dbpath=.

Add Environment Vars File 
* Create file local_env.yml in the root of the project
* Add the following variables COINBASE_CLIENT_ID,COINBASE_CLIENT_SECRET,COINBASE_CALLBACK_URL,DOMAIN_NAME to the env file

Run DigitalMarketPlace
```sh
cd DigitalMarketPlace
bundle install
rails server
```
Navigate to http://localhost:3000