class Transaction < ApplicationRecord
	belongs_to :budget, dependent: :destroy
end
