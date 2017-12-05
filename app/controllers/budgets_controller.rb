class BudgetsController < ApplicationController
	before_action :authenticate_user!

	def show
		@user = current_user
		@budget = @user.budget		
	end

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

	def edit
		@user = current_user
		@budget = @user.budget
		@edit = true
	end

	def update
	    @budget = current_user.budget
	    if @budget.update_attributes(budget_params)
	      # Handle a successful update.
	      redirect_to pages_dashboard_path
	    else
	      render 'edit'
	    end
	end

	private
		def budget_params
			params.require(:budget).permit(:id, :start_time, :starting_cash, :current_cash, :user_id, :transaction_id, categories_attributes:[:id, :name, :amount, :fixed, :order, :percent, :spending, :_destroy])
		end
end
