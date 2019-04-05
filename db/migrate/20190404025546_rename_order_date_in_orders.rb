class RenameOrderDateInOrders < ActiveRecord::Migration[5.2]
  def change
    rename_column :orders, :orderDate, :order_date
  end
end
