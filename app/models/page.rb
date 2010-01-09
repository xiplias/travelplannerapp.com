class Page < ActiveRecord::Base
  belongs_to :pageable, :polymorphic => true
end
