Rails.application.routes.draw do
  devise_for :users, controllers: {
  	session: 'users/sessions',
  }, :path => ''

  resources :budgets do
  	resources :transactions
  end

  root 'pages#index'

  get 'pages/dashboard'
  get "transactions/new" => 'transactions#new', :as => :new_transaction

end
