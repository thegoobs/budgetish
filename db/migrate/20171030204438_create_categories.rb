class CreateCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :categories do |t|
      t.text :name
      t.boolean :fixed
      t.float :amount
      t.float :percent

      t.timestamps
    end
  end
end
