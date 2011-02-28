module HotelsHelper
  def hotel_feature_present?(hotel_feature)
    @hotel.feature_ids.include?(hotel_feature.id)
  end

  def hotel_star_rating(hotel)
    if hotel.star_rating
      html = ''
      hotel.star_rating.times do
         html += image_tag 'star.png'
      end
      html
    end
  end
end
