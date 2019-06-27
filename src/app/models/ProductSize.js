module.exports = (sequelize, DataTypes) => {
  const ProductSize = sequelize.define('ProductSize', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.STRING
  })

  ProductSize.associate = models => {
    ProductSize.belongsTo(models.ProductType, {
      as: 'product_type',
      foreignKey: 'product_type_id'
    })
  }

  return ProductSize
}
