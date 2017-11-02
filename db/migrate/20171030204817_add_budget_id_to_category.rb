class AddBudgetIdToCategory < ActiveRecord::Migration[5.1]
  def change
    add_column :categories, :budget_id, :integer
  end
end
