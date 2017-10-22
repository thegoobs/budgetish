class CreateBudgets < ActiveRecord::Migration[5.1]
  def change
    create_table :budgets do |t|
      t.datetime :start_time
      t.float :starting_cash
      t.float :current_cash

      t.timestamps
    end
  end
end
