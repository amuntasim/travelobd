class SpotsController < ApplicationController

  before_filter :require_user, :only =>[:new, :edit, :create, :update, :destroy]
  before_filter lambda { @active_nav = 'spot' }

  before_filter :load_item, :only =>[:show, :edit, :update, :destroy, :print]
  before_filter :check_ownership, :only => [:edit, :update, :destroy]

  #layout :choose_layout

  uses_tiny_mce :only =>[:new, :edit], :options => {
      :width => '445px',
      :height => '250px'
  }

  # GET /spots
  # GET /spots.xml
  def index
    conditions = []
    conditions.add_condition!(:category_id =>params[:category_id]) unless params[:category_id].blank?
    @spots = Spot.paginate(:page=> params[:page], :conditions => conditions)
    @search_title = Spot::CATEGORIES.invert[params[:category_id].to_i] || 'All Spots'

  end

  # GET /spots/1
  # GET /spots/1.xml
  def show
    @spot = Spot.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml { render :xml => @spot }
    end
  end

  # GET /spots/new
  # GET /spots/new.xml
  def new
    @spot = Spot.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml { render :xml => @spot }
    end
  end

  # GET /spots/1/edit
  def edit
    @spot = Spot.find(params[:id])
  end

  # POST /spots
  # POST /spots.xml
  def create
    @spot = Spot.new(params[:spot])
    @spot.user_id = current_user.id
    respond_to do |format|
      if @spot.save
        format.html { redirect_to(@spot, :notice => t('general.label.item_created', :item => t('activerecord.models.spot'))) }
        format.xml { render :xml => @spot, :status => :created, :location => @spot }
      else
        format.html { render :action => "new" }
        format.xml { render :xml => @spot.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /spots/1
  # PUT /spots/1.xml
  def update
    params[:spot][:category_ids] ||= []
    @spot = Spot.find(params[:id])
    respond_to do |format|
      if @spot.update_attributes(params[:spot])
        format.html { redirect_to(@spot, :notice => t('general.label.item_update', :item => t('activerecord.models.spot'))) }
        format.xml { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml { render :xml => @spot.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /spots/1
  # DELETE /spots/1.xml
  def destroy
    @spot = Spot.find(params[:id])
    @spot.destroy

    respond_to do |format|
      format.html { redirect_to(spots_url) }
      format.xml { head :ok }
    end
  end

  def search
    @spot_search = Spot.search(params[:search])
    #ordering = " #{ params[:order]+ ',' unless params[:order].blank? } RAND()"
    ordering = " #{ params[:order] unless params[:order].blank? }"
    @spots = @spot_search.order(ordering).paginate(:page=> params[:page], :per_page => 10)
    @search_label = params[:label] || 'Spots : Search Results '
    @paginate_items = @spots
    render :index
  end

  def delete_asset
    asset = SpotAsset.find(params[:asset_id])
    asset.destroy
    render :nothing => true
  end

  def set_main_photo
    asset = SpotAsset.find(params[:asset_id])
    SpotAsset.update_all ['main = ?', false], ['spot_id = ?', asset.spot_id]
    asset.update_attribute(:main, true)
    render :nothing => true
  end

  def print
    render :layout => 'print'
  end

  private

  def choose_layout
    ['index'].include?(action_name) ? 'admin' : 'application'
  end

  def load_item
    @spot = Spot.find(params[:id])
  end

  def check_ownership
    ownership_require(@spot)
  end

end
