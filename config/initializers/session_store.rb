# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_WorldTripPlanner_session',
  :secret      => '3af4cd16781614c034176ca088c02e2ce7017102fdf41019bfbbb335f77c65d85b449a46421cd105afb2c45fb50e394e7498c3c09848db8343ebf47881626a84'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
