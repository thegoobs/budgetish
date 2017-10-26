Rails.application.routes.draw do
  devise_for :users, controllers: {
  	session: 'users/sessions',
  }, :path => '',
  path_names: { sign_in: 'sign_in', sign_out: 'sign_out'}

  resources :budgets do
  	resources :transactions
  end

  root 'pages#index'

  get 'pages/dashboard'
  get "transactions/new" => 'transactions#new', :as => :new_transaction

end
