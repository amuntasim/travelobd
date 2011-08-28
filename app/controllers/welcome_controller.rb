class WelcomeController < ApplicationController
  def index
    @active_nav = 'home'
    @search = Package.search(params[:search])
    @packages = Package.includes(:translations, :assets, :main_image, :slug).limit(15)
  end

  def featured_ads
    ads = Package.find_random(4, :conditions => ['featured = ?', true])
    render :update do |page|
      page << "$('#featured_ads').html('#{escape_javascript(render :partial =>'featured_ad', :collection => ads)}');"
    end
  end

  #  def ads_for_sale
  #    ads = Classified.where(:category_id => 1).limit(12)
  #    render :update do |page|
  #      page << "$('#ads_for_sale').html('#{escape_javascript(render :partial =>'ad_for_sale', :collection => ads)}');"
  #    end
  #  end

  def articles
    articles = Article.order(:created_at).limit(5)
    render :update do |page|
      page << "$('#articles').html('#{escape_javascript(render :partial =>'article', :collection => articles)}');"
    end
  end

  def load_districts
    @districts = District.where(:division_id => params[:division_id]).all
  end

end
