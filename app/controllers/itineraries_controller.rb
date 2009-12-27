class ItinerariesController < ApplicationController
  def index
    @itineraries = Itinerary.all
  end
  
  def show
    @itinerary = Itinerary.find(params[:id])
  end
  
  def new
    @itinerary = Itinerary.new
  end
  
  def create
    @itinerary = Itinerary.new(params[:itinerary])
    if @itinerary.save
      flash[:notice] = "#{@itinerary.title} itinerary successfully created."
      redirect_to @itinerary
    else
      render :action => 'new'
    end
  end
  
  def edit
    @itinerary = Itinerary.find(params[:id])
  end
  
  def update
    @itinerary = Itinerary.find(params[:id])
    respond_to do |wants|
      wants.html {    
        if @itinerary.update_attributes(params[:itinerary])
          flash[:notice] = "Successfully updated itinerary."
          redirect_to @itinerary
        else
          render :action => 'edit'
        end 
      }
      wants.js { 
        @itinerary.update_attribute(:location_order, params[:itinerary][:location_order])
        render :text => @itinerary.location_order
      }
    end 
  end
  
  def destroy
    @itinerary = Itinerary.find(params[:id])
    @itinerary.destroy
    flash[:notice] = "Successfully deleted itinerary."
    redirect_to itineraries_url
  end
end
