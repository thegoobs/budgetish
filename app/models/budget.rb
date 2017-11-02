class Budget < ApplicationRecord
	belongs_to :user, dependent: :destroy
	has_many :transactions
	has_many :categories, dependent: :destroy
	accepts_nested_attributes_for :categories, allow_destroy: true
end
