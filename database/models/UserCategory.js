module.exports = (sequelize, DataTypes) => {

    var alias = "user_category";
    var cols = {
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
        }
    };
    var config = {
        tableName: "user_category",
        underscored: true,
        timestamps: false
    };

    const UserCategory = sequelize.define(alias, cols, config);

     UserCategory.associate = function (models) {
          UserCategory.belongsTo(models.Users,{
              as: "users",
              foreignKey: "user_category_id"    
          })
      }

    return UserCategory;
}