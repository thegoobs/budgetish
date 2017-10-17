Rails.application.routes.draw do
  devise_for :users, controllers: {
  	session: 'users/sessions'
  }, :path => ''
  root 'pages#index'
end
