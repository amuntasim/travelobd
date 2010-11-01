class WelcomeController < ApplicationController
  def index
    @active_nav = 'home'
    @locations = District.includes(:division)
    @search = Ad.search(params[:search])

  end

  def featured_ads
    ads = Ad.find_random(4, :conditions => ['featured = ?', true])
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

#  def other_classifieds
#    classifieds = Classified.where(['category_id > ?', 1]).limit(12)
#    render :update do |page|
#      page << "$('#other_classified').html('#{escape_javascript(render :partial =>'classified', :collection => classifieds)}');"
#    end
#  end
#
#  def spots
#    spots = Spot.find_random(4)
#    render :update do |page|
#      page << "$('#spots').html('#{escape_javascript(render :partial =>'spot', :collection => spots)}');"
#    end
#  end

end
