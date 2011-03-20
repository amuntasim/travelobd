module RoomsHelper
  def room_feature_present?(room_feature)
    @room.feature_ids.include?(room_feature.id)
  end

  def room_features_list(room)
    html = []
    room.features.each do |feature|
      html << '<li>' + feature.name + '</li>'
    end
    "<ul class='cross_ul_li'>" + html.join(' ') + '</ul>'
  end
end
