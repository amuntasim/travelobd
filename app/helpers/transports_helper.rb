module TransportsHelper

  def departure_schedules(transport)
    html = ''
    transport.departure_schedules.each do |schedule|
      html << "<div class='#{cycle('evenRow', 'oddRow')}'>"
      html << "<div class='eventTitle' style='margin-bottom: 0px'>#{schedule.route}</div>"
      html << "<div class=' departure_times'>#{schedule.time.split(',').collect { |item| '<span class="departure_time">'+ item + '</span>' }.join(' ')}</div>"
      html << "</div>"
    end
    html
  end
end
