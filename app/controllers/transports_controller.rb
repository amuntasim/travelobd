class TransportsController < ApplicationController
  before_filter :require_user, :only=> [:new, :edit, :create, :update, :destroy]
  before_filter lambda { @active_nav = 'transports' }
  before_filter :load_item, :only =>[:show, :edit, :update, :destroy, :print, :rate]
  before_filter :check_ownership, :only => [:edit, :update, :destroy]
  layout :choose_layout
  # GET /ads
  # GET /ads.xml
  def index
    @transports = Transport.paginate(:page=> params[:page], :per_page => 3)
    @paginate_items = @transports
    render :action => 'index_admin', :layout => 'admin' if admin?
  end

  # GET /ads/1
  # GET /ads/1.xml
  def show
    @already_saved = SavedListing.in_my_list(current_user.id, @transport.id, 'Transport') if current_user
    respond_to do |format|
      format.html # show.html.erb
      format.xml { render :xml => @transport }
    end
  end

  # GET /ads/new
  # GET /ads/new.xml
  def new
    @transport = Transport.new
  end

  # GET /ads/1/edit
  def edit
  end

  # POST /ads
  # POST /ads.xml
  def create
    @transport = Transport.new(params[:transport])
    @transport.user_id = current_user.id
    respond_to do |format|
      if @transport.save
        format.html { redirect_to(@transport, :notice => t('general.label.item_created', :item => t('activerecord.models.transport'))) }
      else
        format.html { render :action => "new" }
        format.xml { render :xml => @transport.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /ads/1
  # PUT /ads/1.xml
  def update
    params[:transport][:destination_ids] ||= []
    respond_to do |format|
      if @transport.update_attributes(params[:transport])
        format.html { redirect_to(@transport, :notice => t('general.label.item_update', :item => t('activerecord.models.transport'))) }
        format.xml { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml { render :xml => @transport.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /ads/1
  # DELETE /ads/1.xml
  def destroy
    @transport.destroy

    respond_to do |format|
      format.html { redirect_to(transports_url) }
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
      Asset.update_all ['main = ?', false], ['assetable_type = ? AND assetable_id = ?', 'Transport', asset.assetable_id]
      asset.update_attribute(:main, true)
      render :nothing => true
    end




  def location_autocomplete
    districts = District.includes(:division).where(['districts.name like ?  OR divisions.name like ?', "%#{params[:term]}%", "%#{params[:term]}%"]).limit(15)
    render :json => districts.collect { |c| {"id" => c.id, "label" => "#{c.name}, #{c.division.name if c.division}", "value" => c.name} }
  end


  def search
    @transport_search = Transport.search(params[:search])
    @transports = @transport_search.paginate(:page=> params[:page], :per_page => 10)
    @search_label = params[:label] || 'Transports : Search Results '
    @paginate_items = @transports
    render :index
  end


  def print
    render :layout => 'print'
  end

  def rate
    @transport.rate(params[:stars], current_user, params[:dimension])
    respond_to do |format|
      format.js { render :partial => '/comments/rate', :locals => {:obj => @transport} }
    end

  end


  private

  def load_item
    @transport = Transport.find(params[:id])
  end

  def check_ownership
    ownership_require(@transport)
  end

  def choose_layout
    ['new', 'edit'].include?(action_name) ? 'dashboard' : 'application'
  end
end


