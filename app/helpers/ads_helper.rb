module AdsHelper
  def ad_photo_number_str(ad)
    if ad.featured?
      "Featured Ads includes up to #{@ad_settings['featured_package_photos']} photos"
    else
      "Basic Ads includes up to #{@ad_settings['basic_package_photos']}  photos"
    end
  end
end
