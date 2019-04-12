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
      ORDER BY orders.created_at DESC;
    ")
  end


  # Client.all(:joins => 'LEFT OUTER JOIN addresses ON addresses.client_id = clients.id')
# Client.count(:conditions => "clients.first_name = 'Ryan' AND orders.status = 'received'", :include => "orders")


end
