require 'spec_helper'

describe POI do
  before(:each) do
    @valid_attributes = {
      :name => "value for name",
      :latitude => 1,
      :longitude => 1
    }
  end

  it "should create a new instance given valid attributes" do
    POI.create!(@valid_attributes)
  end
end
