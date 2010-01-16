class LocationsController < ApplicationController
  def index
    if params[:itinerary_id]
      @itinerary = Itinerary.find(params[:itinerary_id])
      if @itinerary.location_order.nil?
        @locations = @itinerary.locations      
      else          
        @array = @itinerary.location_order.split(",").collect{ |s| s.to_i }
        @locations = @itinerary.locations.find(:all)
        
        @result = Array.new
        
        @array.each do |a|
          @locations.each do |l|
            if l.id == a
              @result.push(l)
              @locations.delete(l)
            end
          end
        end
        
        @locations = [@result, @locations].flatten
      end
    else
      @locations = Location.all
    end
    
    respond_to do |wants|
      wants.html {}
      wants.js {  
        render :partial => "test"
      }
    end    
  
  end
  
  def find
    @geo_result = Location.find_location(params[:q])
    
    respond_to do |wants|
      wants.js { render :partial => "autocomplete", :layout => false }
    end
  end
  
  def show
    @location = Location.find(params[:id])
  end
  
  def new
    @location = Location.new
  end
  
  def create
    @location = Location.new(params[:location])
    if @location.save
      flash[:notice] = "Successfully created location."
      respond_to do |format|
        format.html { redirect_to @location }
        format.js { render :text => @location.id}
      end
    else
      respond_to do |format|
        format.html { redirect_to location_path }
        format.js { render :text => "failure"}
      end
    end
  end
  
  def edit
    @location = Location.find(params[:id])
  end
  
  def update
    @location = Location.find(params[:id])
    if @location.update_attributes(params[:location])
      flash[:notice] = "Successfully updated location."
      if params[:itinerary_id]
        redirect_to itinerary_location_path(params[:itinerary_id], @location)
      end
    else
      render :action => 'edit'
    end
  end
  
  def destroy
    @location = Location.find(params[:id])
    @location.destroy
    flash[:notice] = "Successfully destroyed location."
    
    
    respond_to do |wants|
      wants.js { render :text => "" }
      wants.html{ redirect_to locations_url }
    end
  end
end
