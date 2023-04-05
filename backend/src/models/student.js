const Sequelize = require('sequelize');

class Student extends Sequelize.Model {
    static initiate(sequelize) {
        Student.init(
            {
                student_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                },
                student_name: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                },
                student_department: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                student_contact: {
                    type: Sequelize.STRING(25),
                    allowNull: true,
                },
                student_room: {
                    type: Sequelize.SMALLINT.UNSIGNED,
                    allowNull: false,
                },
                student_password: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'Student',
                tableName: 'students',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        );
    }

    static associate(db) {
        db.Student.hasMany(db.OvernightApplication, {
            foreignKey: 'student_id',
            sourceKey: 'student_id',
        });
    }
}

module.exports = Student;
