class PagesController < ApplicationController

	def index
		if user_signed_in?
			if Budget.exists?(user_id: current_user.id)
				redirect_to pages_dashboard_path
			else
				redirect_to new_budget_path
			end
		end
	end

	def dashboard
		current_user.budget.current_cash = current_user.budget.starting_cash + current_user.budget.transactions.sum(:amount)
	end
end
