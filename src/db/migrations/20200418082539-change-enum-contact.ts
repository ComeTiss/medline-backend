import {
  QueryInterface,
} from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize) => queryInterface.sequelize.query("ALTER TYPE enum_contacts_type ADD VALUE 'zoom'")
    .then(() => queryInterface.sequelize.query("ALTER TYPE enum_contacts_type ADD VALUE 'messenger'")),

  down: (queryInterface: QueryInterface, Sequelize) => {
    const queryRemoveZOOM = "DELETE FROM pg_enum "
      + "WHERE enumlabel = 'zoom' "
      + "AND enumtypid = ( SELECT oid FROM pg_type WHERE typname = 'enum_contacts_type')";
    const queryRemoveMESSENGER = "DELETE FROM pg_enum "
      + "WHERE enumlabel = 'messenger' "
      + "AND enumtypid = ( SELECT oid FROM pg_type WHERE typname = 'enum_contacts_type')";
    return queryInterface.sequelize.query(queryRemoveZOOM)
      .then(() => queryInterface.sequelize.query(queryRemoveMESSENGER));
  },
};
