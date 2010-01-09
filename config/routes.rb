ActionController::Routing::Routes.draw do |map|
  map.resources :pages

  map.resources :itineraries, :has_many => :locations
  map.resources :locations, :collection => {
    :find => :get
  }

  map.login "login", :controller => "user_sessions", :action => "new"
  map.logout "logout", :controller => "user_sessions", :action => "destroy"
  
  map.resources :users
  map.resources :user_sessions
  
  map.root :controller => "itineraries"

end
