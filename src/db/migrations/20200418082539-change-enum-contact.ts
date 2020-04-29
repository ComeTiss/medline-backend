import {
  QueryInterface,
} from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize) => queryInterface.sequelize.query("ALTER TYPE enum_contacts_type ADD VALUE 'ZOOM'")
    .then(() => queryInterface.sequelize.query("ALTER TYPE enum_contacts_type ADD VALUE 'MESSENGER'")),

  down: (queryInterface: QueryInterface, Sequelize) => {
    const queryRemoveZOOM = "DELETE FROM pg_enum "
      + "WHERE enumlabel = 'ZOOM' "
      + "AND enumtypid = ( SELECT oid FROM pg_type WHERE typname = 'enum_contacts_type')";
    const queryRemoveMESSENGER = "DELETE FROM pg_enum "
      + "WHERE enumlabel = 'MESSENGER' "
      + "AND enumtypid = ( SELECT oid FROM pg_type WHERE typname = 'enum_contacts_type')";
    return queryInterface.sequelize.query(queryRemoveZOOM)
      .then(() => queryInterface.sequelize.query(queryRemoveMESSENGER));
  },
};
