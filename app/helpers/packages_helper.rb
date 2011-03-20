module PackagesHelper
  def ad_photo_number_str(package)
    if package.featured?
      "Featured Packages includes up to #{@package_settings['featured_package_photos']} photos"
    else
      "Basic Packages includes up to #{@package_settings['basic_package_photos']}  photos"
    end
  end

  def price_str(package)
    package.price_per_person? ? "Per Person" : "Total"
  end

  def package_spots_links(package)
    html = []
    package.spots.each do |spot|
      html << '<li>' + link_to(spot.name, spot, :target => '_blank') + '</li>'
    end

    "<ul>" + html.join(' ') + '</ul>'
  end

end
