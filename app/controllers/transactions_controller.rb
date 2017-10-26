class TransactionsController < ApplicationController
	def new
		@budget = current_user.budget
		respond_to :js, :html
	end

	def create
		@budget = current_user.budget
		@transaction = @budget.transactions.create(transaction_params)
		redirect_to pages_dashboard_path
	end

	private
		def transaction_params
			params.require(:transaction).permit(:name, :amount)
		end
end
