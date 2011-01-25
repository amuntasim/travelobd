class AdsController < ApplicationController
  
  before_filter :require_user_set_step, :only=> :new
  before_filter :require_user, :only=> [:new, :edit, :create, :update, :destroy]
  before_filter lambda { @active_nav = 'packages'  }
  before_filter :load_item, :only =>[:show, :edit, :update, :destroy, :print ]
  before_filter :check_ownership, :only => [:edit, :update, :destroy]

  # GET /ads
  # GET /ads.xml
  def index
    @ads = Ad.paginate(:page=> params[:page], :per_page => 15)
    @paginate_items = @ads
    render :action => 'index_admin', :layout => 'admin'  if admin?
  end

  # GET /ads/1
  # GET /ads/1.xml
  def show
    @already_saved = SavedListing.in_my_list(current_user.id, @ad.id, 'Ad') if current_user
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @ad }
    end
  end

  # GET /ads/new
  # GET /ads/new.xml
  def new
    #    if params[:f].blank?
    #      @ad_current_step = 2
    #      render :action => :plan
    #      return
    #    end
    @ad_current_step = 3
    @ad = Ad.new
    @ad.featured = true if params[:f] == 'true'

    @ad.assets.build
    @ad.videos.build
    @pedigrees = []
    @max_pedigree_position = 0
    @ad_settings = Element.ad_settings
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @ad }
    end
  end

  # GET /ads/1/edit
  def edit
    @ad_settings = Element.ad_settings
  end

  # POST /ads
  # POST /ads.xml
  def create
    @ad = Ad.new(params[:ad])
    @ad.user_id = current_user.id
    respond_to do |format|
      if @ad.save
        redirect_to ad_path(@ad), :notice => 'Package was successfully createds.'
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @ad.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /ads/1
  # PUT /ads/1.xml
  def update
    respond_to do |format|
      if @ad.update_attributes(params[:ad])
        format.html { redirect_to(ad_path(@ad), :notice => 'Package was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @ad.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /ads/1
  # DELETE /ads/1.xml
  def destroy
    @ad.destroy

    respond_to do |format|
      format.html { redirect_to(packages_url) }
      format.xml  { head :ok }
    end
  end

  def delete_asset
    asset = AdAsset.find(params[:asset_id])
    asset.destroy
    render :nothing => true
  end

  def set_main_photo
    asset = AdAsset.find(params[:asset_id])
    AdAsset.update_all ['main = ?', false], ['ad_id = ?',asset.ad_id]
    asset.update_attribute(:main, true)
    render :nothing => true
  end

  def prepare_padigrees
    params[:ad][:pedigree_ids] ||=[]
    return if params[:pedigree_attrs].blank?
    params[:pedigree_attrs].each do |pa|
      params[:ad][:pedigree_ids] << Pedigree.find_or_create_by_name(pa[:name]).id
    end
    #raise   params[:ad][:pedigree_ids].inspect
  end

  def location_autocomplete
    districts = District.includes(:division).where(['districts.name like ?  OR divisions.name like ?', "%#{params[:term]}%", "%#{params[:term]}%"]).limit(15)
    render :json => districts.collect {|c| {"id" => c.id, "label" => "#{c.name}, #{c.division.name if c.division}", "value" => c.name}}
  end

  def find_ad
    breed = Breed.search(:name_contains => params[:breed_like]).first
    if breed
      @ads = Ad.search(:breed_id_equals => breed.id).paginate(:page=> params[:page], :per_page => 10)
      render :action=> 'search'
    else
      redirect_to advance_search_path
    end
  end

  def search
    search_obj = Ad.search(params[:search])
    @ads = search_obj.paginate(:page=> params[:page], :per_page => 10)
  end

  def advance_search
    @search = Ad.search(params[:search])
  end

  def print
    @max_pedigree_position = @ad.all_pedigrees.order('position DESC').first.position rescue 0
    render :layout => 'print'
  end
  
  private

  private
  def set_district_division
    if params[:ad][:division_id].blank?
      division = Division.first(:conditions =>['country_id = ? AND (name = ? OR code = ?)',@ad.country_id, params[:division_str], params[:division_str]])
      unless division
        division = Division.new(:country_id => @ad.country_id, :name => params[:division_str])
        division.code = params[:division_str] if params[:division_str].length == 2
        division.save
      end
      @ad.division_id = division.id
    end

    if params[:ad][:district_id].blank?
      district = District.first(:conditions =>['country_id = ? AND name = ? ',@ad.country_id, params[:district_str]])
      unless district
        district = District.new(:country_id => @ad.country_id, :division_id=> @ad.division_id,  :name => params[:district_str])
        district.division_id = @ad.division_id
        district.save
      end
      @ad.district_id = district.id
    end
  end

  def update_district_division
    unless params[:division_str].blank?
      division = Division.first(:conditions =>['country_id = ? AND (name = ? OR code = ?)',params[:ad][:country_id], params[:division_str], params[:division_str]])
      unless division
        division = Division.new(:country_id => params[:ad][:country_id], :name => params[:division_str])
        division.code = params[:division_str] if params[:division_str].length == 2
        division.save
      end
      params[:ad][:division_id] ||= division.id
    end

    unless params[:division_str].blank?
      district = District.first(:conditions =>['country_id = ? AND name = ? ',params[:ad][:country_id], params[:district_str]])
      unless district
        district = District.new(:country_id => @ad.country_id, :division_id=> @ad.division_id,  :name => params[:district_str])
        district.division_id = params[:ad][:division_id]
        district.save
      end
      params[:ad][:district_id] ||= district.id
    end
  end

  def require_user_set_step
    session[:ad_current_step] = 1
  end


  def create_pedigrees
    params[:pedigrees].each do |k,v|
      Pedigree.create(:ad_id =>@ad.id, :position=>k, :name => v[:name])
    end
  end

  def update_pedigrees
    params[:pedigrees].each do |k,v|
      pedigree = Pedigree.find_or_create_by_ad_id_and_position(@ad.id,k)
      pedigree.update_attribute(:name, v[:name])
    end
  end

  def load_item
    @ad = Ad.find(params[:id])
  end
  def check_ownership
    ownership_require(@ad)
  end
end
