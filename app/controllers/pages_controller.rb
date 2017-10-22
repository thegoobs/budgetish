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
end
