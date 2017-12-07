class TransactionsController < ApplicationController
	def new
		@budget = current_user.budget
		@subtract = params[:subtract]
		respond_to :js, :html
	end

	def create
		if params[:commit] == "Add to Budget"
			flash[:notice] = "transaction added successfully."
			@budget = current_user.budget
			@transaction = @budget.transactions.create(transaction_params)
			redirect_to pages_dashboard_path
		else

			@t = []
			current_user.budget.categories.count.times do |i|
				@t << Transaction.new
				@t[i].name = "Auto Budget for " + transaction_params[:name]
				if current_user.budget.categories[i].percent != 0
					@t[i].amount = transaction_params[:amount].to_f * (current_user.budget.categories[i].percent.to_f/100)
					current_user.budget.transactions.create(name: @t[i].name, amount: @t[i].amount, category_id: current_user.budget.categories[i].id)
				end
			end
			redirect_to pages_dashboard_path
		end
	end

	private
		def transaction_params
			params.require(:transaction).permit(:name, :amount, :category_id, :subtract)
		end
end
