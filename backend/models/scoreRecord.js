const Sequelize = require('sequelize');

class ScoreRecord extends Sequelize.Model {
    static initiate(sequelize) {
        ScoreRecord.init(
            {
                record_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                student_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                score_type: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                given_score: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                },
                score_reason: {
                    type: Sequelize.STRING(300),
                    allowNull: false,
                },
                score_date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'ScoreRecord',
                tableName: 'score_records',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        );
    }

    static associate(db) {
        db.ScoreRecord.belongsTo(db.Student, {
            foreignKey: 'student_id',
            targetKey: 'student_id',
        });
    }
}

module.exports = ScoreRecord;
