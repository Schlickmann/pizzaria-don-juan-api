module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    cook_time: DataTypes.STRING
  })

  Product.associate = models => {
    Product.hasMany(models.ProductType, {
      as: 'product',
      foreignKey: 'product_id'
    })
  }

  return Product
}
