class TourOperatorsController < ApplicationController
  before_filter :require_user, :only=> [:new, :edit, :create, :update, :destroy]
  before_filter lambda { @active_nav = 'tour_operators' }
  before_filter :load_item, :only =>[:show, :edit, :update, :destroy, :print, :rate]
  before_filter :check_ownership, :only => [:edit, :update, :destroy]
  layout :choose_layout
  # GET /ads
  # GET /ads.xml
  def index
    @tour_operators = TourOperator.paginate(:page=> params[:page], :per_page => 15)
    @paginate_items = @tour_operators
    render :action => 'index_admin', :layout => 'admin' if admin?
  end

  # GET /ads/1
  # GET /ads/1.xml
  def show
    @already_saved = SavedListing.in_my_list(current_user.id, @tour_operator.id, 'TourOperator') if current_user
    respond_to do |format|
      format.html # show.html.erb
      format.xml { render :xml => @tour_operator }
    end
  end

  # GET /ads/new
  # GET /ads/new.xml
  def new
    @tour_operator = TourOperator.new
    @return_to_package = params[:return_to_package]
  end

  # GET /ads/1/edit
  def edit
  end

  # POST /ads
  # POST /ads.xml
  def create
    @tour_operator = TourOperator.new(params[:tour_operator])
    @tour_operator.user_id = current_user.id
    respond_to do |format|
      if @tour_operator.save
        unless params[:return_to_package].blank?
          format.html { redirect_to(new_package_path(:tour_operator_id => @tour_operator), :notice => t('general.label.item_created', :item => t('activerecord.models.tour_operator'))) }
        else
          format.html { redirect_to(@tour_operator, :notice => t('general.label.item_created', :item => t('activerecord.models.tour_operator'))) }
        end
      else
        format.html { render :action => "new" }
        format.xml { render :xml => @tour_operator.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /ads/1
  # PUT /ads/1.xml
  def update
    params[:tour_operator][:destination_ids] ||= []
    respond_to do |format|
      if @tour_operator.update_attributes(params[:tour_operator])
        format.html { redirect_to(@tour_operator, :notice => t('general.label.item_update', :item => t('activerecord.models.tour_operator'))) }
        format.xml { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml { render :xml => @tour_operator.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /ads/1
  # DELETE /ads/1.xml
  def destroy
    @tour_operator.destroy

    respond_to do |format|
      format.html { redirect_to(tour_operators_url) }
      format.xml { head :ok }
    end
  end

  def delete_asset
    asset = Asset.find(params[:asset_id])
    asset.destroy
    render :nothing => true
  end

  def set_main_photo
    asset = Asset.find(params[:asset_id])
    Asset.update_all ['main = ?', false], ['assetable_id = ?', asset.assetable_id]
    asset.update_attribute(:main, true)
    render :nothing => true
  end


  def location_autocomplete
    districts = District.includes(:division).where(['districts.name like ?  OR divisions.name like ?', "%#{params[:term]}%", "%#{params[:term]}%"]).limit(15)
    render :json => districts.collect { |c| {"id" => c.id, "label" => "#{c.name}, #{c.division.name if c.division}", "value" => c.name} }
  end


  def search
    @tour_operator_search = TourOperator.search(params[:search])
    @tour_operators = @tour_operator_search.paginate(:page=> params[:page], :per_page => 10)
    @search_label = params[:label] || 'TourOperators : Search Results '
    @paginate_items = @tour_operators
    render :index
  end


  def print
    render :layout => 'print'
  end

  def rate
    @tour_operator.rate(params[:stars], current_user, params[:dimension])
    respond_to do |format|
      format.js { render :partial => '/comments/rate', :locals => {:obj => @tour_operator} }
    end

  end


  private

  def load_item
    @tour_operator = TourOperator.find(params[:id])
  end

  def check_ownership
    ownership_require(@tour_operator)
  end

  def choose_layout
    ['new', 'edit'].include?(action_name) ? 'dashboard' : 'application'
  end
end



