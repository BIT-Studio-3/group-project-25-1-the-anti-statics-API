# group-project-25-1-the-anti-statics-API

REST API Project for the Anti-statics Disaster Management
System website

## Link to REST API on Render:
https://group-project-25-1-the-anti-statics-api.onrender.com/

## How to setup Development environment

### 1. Setup - Docker

Create a new PostgreSQL database container on Docker (if you haven't already) by running the command below in a terminal:
```
docker run --name api-antistatics-dev -e POSTGRES_PASSWORD=P@ssw0rd -p 5432:5432 -d postgres
```
---

### 2. .env File
In your `.env` file add these lines:

```
APP_ENV=development
DATABASE_URL="postgresql://postgres:P@ssw0rd@localhost:5432/postgres"
```
> Note: If you don't have a `.env` file, create it on the root directory of the repository.

---

### 3. Migrate Schema to Database
Run `npm run prisma:migrate` to **migrate** the **schema** located in the `./prisma/schema.prisma` file to your **PostgreSQL** database.

> Note: this will ensure your **schema** is in sync with your **database**

---

### 4. Run Development Mode

Run `npm run dev` to start the server in development mode.

This command will run the `dev` script specified in the `package.json` file.

The server will start on port `3000`.

You should see the following in the terminal: 
```
[nodemon] 3.1.9
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node app.js`
Server is listening on port 3000. Visit http://localhost:3000/api/v1
```

---

## How to setup Testing environment

### 1. Setup - Docker

Create a new PostgreSQL database container on Docker (if you haven't already) by running the command below in a terminal:
```
docker run --name api-antistatics-test -e POSTGRES_PASSWORD=P@ssw0rd -p 5433:5432 -d postgres
```
> Note: Change the local port **5432**:5432 to **5433** to distinguish the testing container from the development container.
---

### 2. .env File
In your `.env` file add these lines:

```
APP_ENV=testing
DATABASE_URL="postgresql://postgres:P@ssw0rd@localhost:5433/postgres"
```
> Note: Once again change the port in the `DATABASE_URL` variable to **5433**

---

### 3. Migrate Schema to Database
Run `npm run prisma:migrate` to **migrate** the **schema** located in the `./prisma/schema.prisma` file to your **PostgreSQL** database.

> Note: this will ensure your **schema** is in sync with your **database**

---

## How to seed the PostgreSQL

Seeding the database will populate it with data. The data will come from seeding scripts located in the `./prisma/seeding` directory of the repository.

There will be seeding files for each database model. Methods for seeding a database include:

1. **Prisma Client**
2. **GitHub Gist**

To seed the database with a data for a particular model run e.g: `npm run prisma:seed-alerts`

## How to run API tests?
Run `npm run test` to run tests as specified in the testing files within the `tests` directory

The script will reset the database and allow a testing framework called Mocha to run the tests.

When running the tests, you should see the following output:

```
Constellations
    ✔ should reject non-string name
    ✔ should create a valid alert
    ✔ should create another valid alert
    ✔ should retrieve all alerts
    ✔ should retrieve a alert by ID
    ✔ should filter alerts by name
    ✔ should sort alerts by name
    ✔ should reject non-numeric area during update
    ✔ should update a valid alert
    ✔ should delete a alert by ID


  10 passing
```
> Note: the **Alerts** tests aren't the only **tests** that will show. There will **more tests** showing once **testing** is implemented for the other database **models**

---

## There's a problem with the deployed API but it works fine locally!
Go to the API on Render, click Manual Deploy, click Clear build cache and deploy

## How to run Prisma Studio
TBD

---
