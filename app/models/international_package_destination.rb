class InternationalPackageDestination < ActiveRecord::Base
  translates :detail
  belongs_to :city
  belongs_to :country
end

