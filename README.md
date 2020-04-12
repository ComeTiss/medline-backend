# Medline-backend 
Stack: TypeScript, ESLINT, Babel, Express

## Commands
- development: **npm run start** 
- lint: **npm run lint**
- lint automatic fix: **npm run lint:fix**
- test: **npm run test**

## Create a new table
Go in the **/db** directory
1. Use sequelize CLI to generate model & migration file

- run: **sequelize model:create --name <model-name> --attributes <attribute-name>:<attribute-type>** 
- example: sequelize model:create --name User --attributes name:string email:string
  
2. Modify generated files to ES6 format & change extension type to .ts

3. run **sequelize db:migrate** to create Postgres table
