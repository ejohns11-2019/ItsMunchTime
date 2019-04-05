class Restaurant < ApplicationRecord
  has_many :orders
  has_many :users, through: :orders

  validates :name, length: { 1..50 }, presence :true, on: :create
  validates :address, uniqueness: true
  validates :phone, length: { is: 10 }
  validates :menu, allow_blank: true
end
