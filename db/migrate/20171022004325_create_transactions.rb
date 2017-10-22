class CreateTransactions < ActiveRecord::Migration[5.1]
  def change
    create_table :transactions do |t|
      t.text :name
      t.float :amount

      t.timestamps
    end
  end
end
