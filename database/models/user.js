module.exports = (Sequelize, DataTypes) => {

    let alias = "Users";
    let cols = {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincremental: true
        },
        first_name: {
            type: DataTypes.SRTING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.SRTING,
            allowNull: false
        },
        email: {
            type: DataTypes.SRTING,
        },
        password: {
            type: DataTypes.SRTING,
            allowNull: false
        },
        image: {
            type: DataTypes.SRTING,
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
        
        timestamps: false
    };

    const User = Sequelize.define(alias, cols, config);

    User.associate = (modelos) => {
        User.hasMany(modelos.User_Category,{
            as: "user_category",
            foreignKey: "user_category_id"    
        });
    }
}

    return User;
