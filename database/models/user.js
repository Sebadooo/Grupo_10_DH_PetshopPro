module.exports = (sequelize, DataTypes) => {

    var alias = "Users";
    var cols = {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincremental: true
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        user_category_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
         },
        image: {
            type: DataTypes.STRING(100),
        },
    };

    var config = {
        tableName: "users",
        underscored: true,
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.belongsTo(models.user_category,{
            as: "user_cat",
            foreignKey: "user_category_id"    
        })
    };


    return User;
}
