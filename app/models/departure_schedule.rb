class DepartureSchedule < ActiveRecord::Base
  belongs_to :transport
  translates :route, :time
end
