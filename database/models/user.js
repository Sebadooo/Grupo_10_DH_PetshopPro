module.exports = (sequelize, DataTypes) => {

    var alias = "Users";
    var cols = {
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
        user_category_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        image: {
            type: DataTypes.STRING,
        },
    };

    var config = {
        tableName: "users",
        underscored: true,
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.hasMany(models.user_category,{
            as: "user_cat",
            foreignKey: "user_category_id"    
        })
    };


    return User;
}
