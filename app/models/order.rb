class Order < ApplicationRecord
  belongs_to :user
  belongs_to :restaurant

  validates :current, default: false
  validates :ticket, allow_blank: true, length: { maximum: 500 }
  validates :orderDate, allow_blank: false, length: { maximum: 20 }
  validate :order_date_cannot_be_in_the_past

  def order_date_cannot_be_in_the_past
    if orderDate.present? && orderDate < Date.today
      errors.add(:orderDate, "can't be in the past")
    end
end
