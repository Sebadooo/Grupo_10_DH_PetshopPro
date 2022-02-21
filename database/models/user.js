module.exports = (sequelize, DataTypes) => {

    let alias = "Users";
    let cols = {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincremental: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
        },
        user_category_id: {
            type: DataTypes.INTEGER,
        },
        creation_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        last_update_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        last_update_by: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        tableName: "users",
        underscored: true,
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.hasMany(models.UserCategory,{
            as: "user_category",
            foreignKey: "user_category_id"    
        })
    };


    return User;
}
