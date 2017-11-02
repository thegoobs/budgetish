class AddCategoryIdToTransaction < ActiveRecord::Migration[5.1]
  def change
    add_column :transactions, :category_id, :integer
  end
end
