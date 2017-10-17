Rails.application.routes.draw do
  devise_for :users, controllers: {
  	session: 'users/sessions'
  }
  root 'pages#index'
end
