module.exports = (Sequelize, DataTypes) => {

    let alias = "user_category";
    let cols = {
        user_category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincremental: true
        },
        category_name: {
            type: DataTypes.SRTING,
            allowNull: false
        },
        description: {
            type: DataTypes.SRTING,
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
        tablename = "user_category",
        timestamps: false
    };

    const UserCategory = Sequelize.define(alias, cols, config);

    UserCategory.associate = function(modelos){
        UserCategory.belongsTo(modelos.Users,{
            as: "user",
            foreignKey: "user_category_id"    
        });
    }

    return UserCategory;
}