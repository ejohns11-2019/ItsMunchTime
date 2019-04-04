class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.boolean :current
      t.text :ticket
      t.date :orderDate
      t.belongs_to :user, foreign_key: true
      t.belongs_to :restaurant, foreign_key: true

      t.timestamps
    end
  end
end
