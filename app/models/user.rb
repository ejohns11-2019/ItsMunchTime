# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :orders, dependent: :destroy
  has_many :restaurants, through: :orders

  validates :first_name, length: { minimum: 2 }, presence: true, on: :create
  validates :last_name, length: { minimum: 2 }, presence: true, on: :create
  validates :email, uniqueness: true, on: :create
  # validates :password, length: { in: 8..30 }
  # validates :allergies, allow_nil: true, length: { in: 1..100 }
  # validates :exceptions, allow_blank: true, length: { maximum: 500 }
end
