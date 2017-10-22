class AddUserToBudget < ActiveRecord::Migration[5.1]
  def change
    add_reference :budgets, :user, foreign_key: true
  end
end
