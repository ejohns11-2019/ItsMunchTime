class AddFirstNameLastNameGroupAllergiesExceptionsAdminToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :group, :string
    add_column :users, :allergies, :text
    add_column :users, :exceptions, :text
    add_column :users, :admin, :boolean
  end
end
