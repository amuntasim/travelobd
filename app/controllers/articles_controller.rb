class ArticlesController < ApplicationController

  before_filter :require_user, :only =>[:new, :edit, :create, :update]
  before_filter :require_admin_user, :only =>[:destroy]
  before_filter lambda { @active_nav = 'articles' }
  before_filter :load_item, :only =>[:show, :edit, :update, :destroy, :print]
  before_filter :check_ownership, :only => [:edit, :update, :destroy]


#  uses_tiny_mce :only =>[:new, :edit],:options => {
#    :width => '445px',
#    :height => '250px'
#  }

  # GET /articles
  # GET /articles.xml
  def index
    conditions = []
    conditions.add_condition!(:category_id =>params[:category_id]) unless params[:category_id].blank?
    @articles = Article.paginate(:page=> params[:page], :per_page => 10, :conditions => conditions)
    #@search_title = Article::CATEGORIES.invert[params[:category_id].to_i] || 'All Articles'
    @search_title = 'All Articles'
    render :action => 'index_admin', :layout => 'admin' if admin?
  end

  # GET /articles/1
  # GET /articles/1.xml
  def show
    @article = Article.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml { render :xml => @article }
    end
  end

  # GET /articles/new
  # GET /articles/new.xml
  def new
    @article = Article.new(:category_id =>params[:category_id])

    respond_to do |format|
      format.html # new.html.erb
      format.xml { render :xml => @article }
    end
  end

  # GET /articles/1/edit
  def edit
    @article = Article.find(params[:id])
  end

  # POST /articles
  # POST /articles.xml
  def create
    @article = Article.new(params[:article])
    @article.user_id = current_user.id
    respond_to do |format|
      if @article.save
        format.html { redirect_to(@article, :notice => t('general.label.item_created', :item => t('activerecord.models.article'))) }
        format.xml { render :xml => @article, :status => :created, :location => @article }
      else
        format.html { render :action => "new" }
        format.xml { render :xml => @article.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /articles/1
  # PUT /articles/1.xml
  def update
    @article = Article.find(params[:id])

    respond_to do |format|
      if @article.update_attributes(params[:article])
        format.html { redirect_to(@article, :notice => t('general.label.item_update', :item => t('activerecord.models.article'))) }
        format.xml { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml { render :xml => @article.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /articles/1
  # DELETE /articles/1.xml
  def destroy
    @article = Article.find(params[:id])
    if (admin? || @article.user_id == current_user.id)
      @article.destroy
    end

    respond_to do |format|
      format.html { redirect_to(articles_url) }
      format.xml { head :ok }
    end
  end

  def delete_asset
    asset = ArticleAsset.find(params[:asset_id])
    asset.destroy
    render :nothing => true
  end

  def set_main_photo
    asset = ArticleAsset.find(params[:asset_id])
    ArticleAsset.update_all ['main = ?', false], ['article_id = ?', asset.article_id]
    asset.update_attribute(:main, true)
    render :nothing => true
  end

  def search
    search_obj = Article.search(params[:search])
    ordering = "created_at DESC"
    @articles = search_obj.order(ordering).paginate(:page=> params[:page], :per_page => 10)
    @search_label = params[:label] || 'Articles : Search Results '
  end

  def print
    render :layout => 'print'
  end

  private
  def load_item
    @article = Article.find(params[:id])
  end

  def check_ownership
    ownership_require(@article)
  end

end
