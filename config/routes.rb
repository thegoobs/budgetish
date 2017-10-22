Rails.application.routes.draw do
  devise_for :users, controllers: {
  	session: 'users/sessions',
  }, :path => '',
  path_names: { sign_in: 'sign_in', sign_out: 'sign_out'}
  root 'pages#index'

  get 'pages/dashboard'
end
