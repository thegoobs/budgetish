class AddBudgetIdToTransactions < ActiveRecord::Migration[5.1]
  def change
    add_column :transactions, :budget_id, :int
  end
end
