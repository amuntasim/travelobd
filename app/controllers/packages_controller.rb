class PackagesController < ApplicationController

  before_filter :require_user, :only=> [:new, :edit, :create, :update, :destroy]
  before_filter lambda { @active_nav = 'packages' }
  before_filter :load_item, :only =>[:show, :edit, :update, :destroy, :print, :rate]
  before_filter :check_ownership, :only => [:edit, :update, :destroy]
  layout :choose_layout
  # GET /ads
  # GET /ads.xml
  def index
    @packages = Package.paginate(:page=> params[:page], :per_page => 15)
    @paginate_items = @packages
    render :action => 'index_admin', :layout => 'admin' if admin?
  end

  # GET /ads/1
  # GET /ads/1.xml
  def show
    @already_saved = SavedListing.in_my_list(current_user.id, @package.id, 'Package') if current_user
    respond_to do |format|
      format.html # show.html.erb
      format.xml { render :xml => @package }
    end
  end

  # GET /ads/new
  # GET /ads/new.xml
  def new
    @package = Package.new
    @package.tour_operator_id = params[:tour_operator_id] unless params[:tour_operator_id].blank?
    @package_settings = {} #Element.package_settings
    respond_to do |format|
      format.html # new.html.erb
      format.xml { render :xml => @package }
    end
  end

  # GET /ads/1/edit
  def edit
    @package_settings = Element.package_settings
  end

  # POST /ads
  # POST /ads.xml
  def create
    @package = Package.new(params[:package])
    @package.user_id = current_user.id
    respond_to do |format|
      if @package.save
        format.html { redirect_to package_path(@package), :notice => t('general.label.item_created', :item => t('activerecord.models.package')) }
      else
        format.html { render :action => "new" }
        format.xml { render :xml => @package.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /ads/1
  # PUT /ads/1.xml
  def update
    params[:package][:destination_ids] ||= []

    respond_to do |format|
      if @package.update_attributes(params[:package])
        format.html { redirect_to(package_path(@package), :notice => t('general.label.item_update', :item => t('activerecord.models.package'))) }
        format.xml { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml { render :xml => @package.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /ads/1
  # DELETE /ads/1.xml
  def destroy
    @package.destroy

    respond_to do |format|
      format.html { redirect_to(packages_url) }
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
    Asset.update_all ['main = ?', false], ['assetable_type = ? AND assetable_id = ?', 'Package', asset.assetable_id]
    asset.update_attribute(:main, true)
    render :nothing => true
  end



  def location_autocomplete
    districts = District.includes(:division).where(['districts.name like ?  OR divisions.name like ?', "%#{params[:term]}%", "%#{params[:term]}%"]).limit(15)
    render :json => districts.collect { |c| {"id" => c.id, "label" => "#{c.name}, #{c.division.name if c.division}", "value" => c.name} }
  end

  def find_ad
    breed = Breed.search(:name_contains => params[:breed_like]).first
    if breed
      @packages = Package.search(:breed_id_equals => breed.id).paginate(:page=> params[:page], :per_page => 10)
      render :action=> 'search'
    else
      redirect_to advance_search_path
    end
  end

  def search
    @package_search = Package.search(params[:search])
    #ordering = "featured DESC, #{ params[:order]+ ',' unless params[:order].blank? } RAND()"
    ordering = "featured DESC #{','+ params[:order] unless params[:order].blank? } "
    @packages = @package_search.order(ordering).paginate(:page=> params[:page], :per_page => 10)
    @search_label = params[:label] || t('activerecord.models.package') +' : ' + t('general.label.search_result')
    @paginate_items = @packages
    render :index
  end

  def advance_search
    @search = Package.search(params[:search])
  end

  def print
    @max_pedigree_position = @package.all_pedigrees.order('position DESC').first.position rescue 0
    render :layout => 'print'
  end

  def rate
    @package.rate(params[:stars], current_user, params[:dimension])
    respond_to do |format|
      format.js { render :partial => '/comments/rate', :locals => {:obj => @package} }
    end

  end


  private

  private
  def set_district_division
    if params[:package][:division_id].blank?
      division = Division.first(:conditions =>['country_id = ? AND (name = ? OR code = ?)', @package.country_id, params[:division_str], params[:division_str]])
      unless division
        division = Division.new(:country_id => @package.country_id, :name => params[:division_str])
        division.code = params[:division_str] if params[:division_str].length == 2
        division.save
      end
      @package.division_id = division.id
    end

    if params[:package][:district_id].blank?
      district = District.first(:conditions =>['country_id = ? AND name = ? ', @package.country_id, params[:district_str]])
      unless district
        district = District.new(:country_id => @package.country_id, :division_id=> @package.division_id, :name => params[:district_str])
        district.division_id = @package.division_id
        district.save
      end
      @package.district_id = district.id
    end
  end

  def update_district_division
    unless params[:division_str].blank?
      division = Division.first(:conditions =>['country_id = ? AND (name = ? OR code = ?)', params[:package][:country_id], params[:division_str], params[:division_str]])
      unless division
        division = Division.new(:country_id => params[:package][:country_id], :name => params[:division_str])
        division.code = params[:division_str] if params[:division_str].length == 2
        division.save
      end
      params[:package][:division_id] ||= division.id
    end

    unless params[:division_str].blank?
      district = District.first(:conditions =>['country_id = ? AND name = ? ', params[:package][:country_id], params[:district_str]])
      unless district
        district = District.new(:country_id => @package.country_id, :division_id=> @package.division_id, :name => params[:district_str])
        district.division_id = params[:package][:division_id]
        district.save
      end
      params[:package][:district_id] ||= district.id
    end
  end


  def load_item
    @package = Package.find(params[:id])
  end

  def check_ownership
    ownership_require(@package)
  end

  def choose_layout
    ['new', 'edit'].include?(action_name) ? 'dashboard' : 'application'
  end
end
