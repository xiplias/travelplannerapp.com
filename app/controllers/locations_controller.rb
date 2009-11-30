class LocationsController < ApplicationController
  def index
    if params[:itinerary_id]
      @locations = Location.find(:all, :conditions => "itinerary_id = #{params[:itinerary_id]}")
    else
      @locations = Location.all
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
        format.js { render :text => "success"}
      end
    else
      respond_to do |format|
        format.html { redirect_to @location }
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
      redirect_to @location
    else
      render :action => 'edit'
    end
  end
  
  def destroy
    @location = Location.find(params[:id])
    @location.destroy
    flash[:notice] = "Successfully destroyed location."
    redirect_to locations_url
  end
end
