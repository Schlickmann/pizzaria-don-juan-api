module.exports = (sequelize, DataTypes) => {
  const ProductType = sequelize.define('ProductType', {
    name: DataTypes.STRING,
    image: DataTypes.STRING
  })

  ProductType.associate = models => {
    ProductType.hasMany(models.ProductSize, {
      as: 'product_type',
      foreignKey: 'product_type_id'
    })
    ProductType.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'product_id'
    })
  }

  return ProductType
}
