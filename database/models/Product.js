module.exports = (sequelize, DataTypes) => {

    let alias = "Products";
    let cols = {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincremental: true
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        procuct_category_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
        },
        uom_code: {
            type: DataTypes.STRING,
        },
        price: {
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
        tableName: "products",
        underscored: true,
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
        Product.belongsTo(models.ProductCategory,{
            as: "product_category",
            foreignKey: "product_category_id"    
        })
    };


    return Product;
}
