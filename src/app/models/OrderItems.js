module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {})

  OrderItem.associate = models => {
    OrderItem.belongsTo(models.Order, {
      as: 'order',
      foreignKey: 'order_id'
    })
    OrderItem.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'product_id'
    })
    OrderItem.belongsTo(models.ProductType, {
      as: 'product_type',
      foreignKey: 'product_type_id'
    })
    OrderItem.belongsTo(models.ProductSize, {
      as: 'product_size',
      foreignKey: 'product_size_id'
    })
  }

  return OrderItem
}
