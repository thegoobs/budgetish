class BudgetsController < ApplicationController
	def new
		@budget = Budget.new
		@rent = Category.new(:name => 'Rent', :fixed => true)
		@add_rent = true
	end

	def create
		@user = current_user
		@budget = Budget.new(budget_params)
		@budget.start_time = Time.now
		@budget.current_cash = @budget.starting_cash
		@user.budget = @budget
		redirect_to pages_dashboard_path
	end

	private
		def budget_params
			params.require(:budget).permit(:id, :start_time, :starting_cash, :current_cash, :user_id, :transaction_id, categories_attributes:[:id, :name, :amount, :fixed, :order, :spending, :_destroy])
		end
end
