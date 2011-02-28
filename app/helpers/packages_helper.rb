module PackagesHelper
  def ad_photo_number_str(package)
    if package.featured?
      "Featured Packages includes up to #{@package_settings['featured_package_photos']} photos"
    else
      "Basic Packages includes up to #{@package_settings['basic_package_photos']}  photos"
    end
  end
end
