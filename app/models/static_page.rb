# == Schema Information
#
# Table name: static_pages
#
#  id         :integer(4)      not null, primary key
#  name       :string(255)
#  permalink  :string(255)
#  content    :text
#  created_at :datetime
#  updated_at :datetime
#

class StaticPage < ActiveRecord::Base
end
