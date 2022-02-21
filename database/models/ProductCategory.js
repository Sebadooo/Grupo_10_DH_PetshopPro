module.exports = (sequelize, DataTypes) => {

    let alias = "Product_Category";
    let cols = {
        product_category_id: {
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
            allowNull: false
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
        tableName: "product_category",
        underscored: true,
        timestamps: false
    };

    const ProductsCategory = sequelize.define(alias, cols, config);

    ProductsCategory.associate = function (models) {
        ProductsCategory.hasMany(models.Products,{
            as: "Products_category",
            foreignKey: "product_id"    
        })
    };


    return ProductsCategory;
}
