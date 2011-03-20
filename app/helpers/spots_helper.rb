module SpotsHelper
  def spot_transports_links(spot)
    html = []
    spot.transports.each do |transport|
      html << '<li>' + link_to(transport.name, transport, :target => '_blank') + '</li>'
    end
    "<ul class='cross_ul_li'>" + html.join(' ') + '</ul>'
  end

  def spot_packages_links(spot)
    html = []
    spot.packages.each do |package|
      html << '<li>' + link_to(package.title, package, :target => '_blank') + '</li>'
    end
    "<ul class='cross_ul_li'>" + html.join(' ') + '</ul>'
  end

end
