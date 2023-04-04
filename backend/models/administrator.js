const Sequelize = require('sequelize');

class Administrator extends Sequelize.Model {
    static initiate(sequelize) {
        Administrator.init(
            {
                admin_id: {
                    type: Sequelize.STRING(50),
                    primaryKey: true,
                    allowNull: false,
                },
                admin_password: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                admin_floor: {
                    type: Sequelize.TINYINT.UNSIGNED,
                    allowNull: false,
                },
                is_admin: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'Administrator',
                tableName: 'administrators',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        );
    }

    static associate(db) {}
}

module.exports = Administrator;
