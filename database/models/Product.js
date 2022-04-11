module.exports = (sequelize, DataTypes) => {

    var alias = "Products";
    var cols = {
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
        product_category_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        image: {
            type: DataTypes.STRING,
        },
        uom_code: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DOUBLE,
               
        } 
    };

    var config = {
        tableName: "products",
        timestamps: false,
        underscored: true
    };

    const Product = sequelize.define(alias, cols, config);

      Product.associate = function (models) {
          Product.belongsTo(models.Product_Category,{
              as: "products_cat",
              foreignKey: "product_category_id"    
          })
      };


    return Product;
}
