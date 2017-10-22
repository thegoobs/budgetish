class TransactionsController < ApplicationController
	def new
		@budget = Budget.find(params[:budget_id])
		@transaction = @budget.transactions.create(transaction_params)
	end

	def create
		render plain: params[:transaction].inspect
	end

	private
		def transaction_params
			params.require(:transation).permit(:name, :amount)
		end
end
