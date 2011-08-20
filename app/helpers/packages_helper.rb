module PackagesHelper
  def ad_photo_number_str(package)
    if package.featured?
      "Featured Packages includes up to #{@package_settings['featured_package_photos']} photos"
    else
      "Basic Packages includes up to #{@package_settings['basic_package_photos']}  photos"
    end
  end

  def price_str(package)
    package.price_per_person? ? t('general.label.per_person') : t('general.label.total')
  end

  def package_spots_links(package)
    html = []
    package.spots.each do |spot|
      html << '<li>' + link_to(spot.name, spot, :target => '_blank') + '</li>'
    end

    "<ul>" + html.join(' ') + '</ul>'
  end

  def package_price(package)

    str = ""
    if package.price_usd && package.price_bdt
      if I18n.locale.to_s == 'bn'
        str += "<span>#{package.price_bdt.bangla}</span> #{t('general.label.taka')} "
      else
        str += "<span>#{package.price_usd} </span>$"
      end
    elsif package.price_bdt
      str += "<span>#{package.price_bdt.bangla}</span> #{t('general.label.taka')}"
    else
      str += "<span>#{package.price_usd.bangla}</span> $ "
    end
    str += '&nbsp;' + price_str(package)
  end
end
