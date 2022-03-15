module.exports = (sequelize, DataTypes) => {
  var alias = "Users";
  var cols = {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoincremental: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    user_category_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    last_update_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    last_update_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  };

  var config = {
    tableName: "users",
    underscored: true,
    timestamps: false,
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.hasMany(models.user_category, {
      as: "user_category",
      foreignKey: "user_category_id",
    });
  };

  return User;
};
