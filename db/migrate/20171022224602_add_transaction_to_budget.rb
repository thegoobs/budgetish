class AddTransactionToBudget < ActiveRecord::Migration[5.1]
  def change
    add_reference :budgets, :transaction, foreign_key: true
  end
end
