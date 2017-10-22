class PagesController < ApplicationController

	def index
		if user_signed_in?
			redirect_to pages_dashboard_path
		end
	end
end
