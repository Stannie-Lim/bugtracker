- npm i

#### if you want to run in development mode and connect to the development db (on your local machine)

- createdb bug_tracker
- npm run seed
- npm run start:dev

#### if you want to run in the digitalocean server and connect to production db (prob only for me)

- npm run seed (if you want to reseed the database which is also hosted)
- npm run build
- npm run start
