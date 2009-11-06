require File.dirname(__FILE__) + '/../spec_helper'

describe Itinerary do
  it "should be valid" do
    Itinerary.new.should be_valid
  end
end
