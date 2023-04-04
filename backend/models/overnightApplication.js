const Sequelize = require('sequelize');

class OvernightApplication extends Sequelize.Model {
    static initiate(sequelize) {
        OvernightApplication.init(
            {
                application_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                },
                student_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                start_date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                end_date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                application_reason: {
                    type: Sequelize.STRING(300),
                    allowNull: false,
                },
                application_time: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
                approval_status: {
                    type: Sequelize.STRING(20),
                    allowNull: true,
                },
                rejection_reason: {
                    type: Sequelize.STRING(300),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'OvernightApplication',
                tableName: 'overnight_applications',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        );
    }

    static associate(db) {
        db.OvernightApplication.belongsTo(db.Student, {
            foreignKey: 'student_id',
            targetKey: 'student_id',
        });
    }
}

module.exports = OvernightApplication;
