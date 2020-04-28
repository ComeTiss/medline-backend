# Medline-backend 
Stack: TypeScript, ESLINT, Babel, Express

## Commands
- development: **npm run start:dev**
- production: **npm run start**
- lint: **npm run lint**
- lint automatic fix: **npm run lint:fix**
- test: **npm run test**

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
  
