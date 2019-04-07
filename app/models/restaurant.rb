class Restaurant < ApplicationRecord
  has_many :orders
  has_many :users, through: :orders

  # validates :name, length: { 1..50 }, presence :true, on: :create
  # validates :address, uniqueness: true, length: { maximum: 100 }
  # validates :phone, length: { is: 10 }
  # validates :menu, allow_blank: true, length: { maximum: 500 }
end
