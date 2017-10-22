class AddBudgetToUser < ActiveRecord::Migration[5.1]
  def change
    add_reference :users, :budget, foreign_key: true
  end
end
