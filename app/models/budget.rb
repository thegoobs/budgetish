class Budget < ApplicationRecord
	belongs_to :user, dependent: :destroy
	has_many :transactions
end
