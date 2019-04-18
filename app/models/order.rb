class Order < ApplicationRecord
  belongs_to :user
  belongs_to :restaurant

  # validates :current, default: false
  # validates :ticket, allow_blank: true, length: { maximum: 500 }
  # validates :orderDate, allow_blank: false, length: { maximum: 20 }
  # validate :order_date_cannot_be_in_the_past

  # def order_date_cannot_be_in_the_past
  #   if orderDate.present? && orderDate < Date.today
  #     errors.add(:orderDate, "can't be in the past")
  #   end

  def self.restaurant_history(id)
    Order.find_by_sql("
      SELECT orders.order_date, orders.ticket, users.first_name, users.last_name 
      FROM orders 
      JOIN users ON users.id = orders.user_id
      WHERE orders.restaurant_id = #{id}
      AND orders.current = false
      ORDER BY orders.created_at DESC;
    ")
  end

  def self.restaurant_visit_counter(id)
    Order.find_by_sql("
      SELECT COUNT (*)
      FROM orders 
      WHERE orders.restaurant_id = #{id};
    ")
  end

  def self.current_orders
    Order.find_by_sql("
      SELECT orders.*, users.first_name, users.last_name, restaurants.name AS rest_name, restaurants.menu
      FROM orders 
      JOIN users ON orders.user_id = users.id
      JOIN restaurants ON restaurants.id = orders.restaurant_id
      WHERE orders.current = true;
    ")
  end
end
