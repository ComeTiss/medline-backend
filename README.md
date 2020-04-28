# Medline-backend 
Stack: TypeScript, ESLINT, Babel, Express

## Commands
- development: **npm run start:dev**
- production: **npm run start**
- lint: **npm run lint**
- lint automatic fix: **npm run lint:fix**
- test: **npm run test**

## Initial Setup
- Create a .env file at the root directory of the repo
- Add **NODE_ENV=development** to the new .env file
- Add **JWT_PRIVATE_KEY=ezfqe.QEMLKjghtrimblak.ejrkqfm__dqd2345632** to the new .env file
- Create a database named **medline_dev** in the psql cli with **CREATE DATABASE medline_dev;**
- Create a user **user1** with a password of **pass** in the psql cli with **CREATE USER user1 WITH ENCRYPTED PASSWORD 'pass';**
- Set **user1** as an admin of **medline_dev** in the psql cli with **GRANT ALL PRIVILEGES ON DATABASE medline_dev TO user1;**
- Run **npm run migrate** from repo directory
- Run **npm run start:dev** from repo directory
- If successful, you should see **=== Test user credentials ===** logged to the console.

## Migrations
* Locally:
1. Create a new migration file (see migration_example.ts)
2. Make sure to increment to higher value the migration index (ex: 20200418082530)
3. Run command **npm run migrate**

> To undo the last migration, run **npm run migrate:undo**


* Production: \
Once the branch is **MERGED**, \
You can apply your new migration in production by running: **npm run migrate-prod**

> To revert the migration: **npm run migrate-prod:undo**
  
