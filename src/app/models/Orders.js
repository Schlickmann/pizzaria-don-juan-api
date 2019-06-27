module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    observation: DataTypes.TEXT,
    zip_code: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    unit: DataTypes.INTEGER,
    district: DataTypes.STRING,
    date_of_order: DataTypes.DATE,
    status: DataTypes.STRING
  })

  Order.associate = models => {
    Order.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id'
    })
    Order.hasMany(models.OrderItem, {
      as: 'order_items',
      foreignKey: 'order_id'
    })
  }

  return Order
}
