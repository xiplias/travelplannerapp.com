ActionController::Routing::Routes.draw do |map|
  map.resources :itineraries


  map.login "login", :controller => "user_sessions", :action => "new"
  map.logout "logout", :controller => "user_sessions", :action => "destroy"
  
  map.resources :users
  map.resources :user_sessions
  
  map.root :controller => "itineraries"

end
