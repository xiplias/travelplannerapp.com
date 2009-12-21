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
    
    if @itinerary.update_attributes(params[:itinerary])
      respond_to do |wants|
        wants.html {  
          flash[:notice] = "Successfully updated itinerary."
          redirect_to @itinerary
        }
        wants.js { render :nothing => true }
      end
    else
      wants.html {  
        render :action => 'edit'
      }
      wants.js { render :text => "failure" }   
    end
  end
  
  def destroy
    @itinerary = Itinerary.find(params[:id])
    @itinerary.destroy
    flash[:notice] = "Successfully deleted itinerary."
    redirect_to itineraries_url
  end
end
