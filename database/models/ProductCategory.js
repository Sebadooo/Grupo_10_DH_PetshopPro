module.exports = (sequelize, DataTypes) => {

    var alias = "Product_Category";
    var cols = {
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
            };
    var config = {
        tableName: "product_category",
        underscored: true,
        timestamps: false
    };

    const ProductsCategory = sequelize.define(alias, cols, config);

     ProductsCategory.associate = function (models) {
         ProductsCategory.hasMany(models.Products,{
             as: "Products",
             foreignKey: "product_category_id"    
         })
     };


    return ProductsCategory;
}
