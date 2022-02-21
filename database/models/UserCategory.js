module.exports = (sequelize, DataTypes) => {

    let alias = "user_category";
    let cols = {
        user_category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincremental: true
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
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
        tableName: "user_category",
        underscored: true,     
        timestamps: false
    };

    const UserCategory = sequelize.define(alias, cols, config);

    UserCategory.associate = function (models) {
        UserCategory.belongsTo(models.User,{
            as: "user",
            foreignKey: "user_id"    
        })
    }

    return UserCategory;
}