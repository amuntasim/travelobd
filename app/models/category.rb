class Category < ActiveRecord::Base
  translates :title
  bangla_for_typus :title


  PARENT = {'Article' => :article, 'Hotel' => :hotel, 'Package' => :package, 'TourOperator' => :tour_operator, 'Transport' => :transport, 'Spot' => :spot}


  def self.method_missing(method_sym, *arguments, &block)
    if method_sym.to_s =~ /^(.*)_categories$/
      self.where(:parent => $1)
    else
      super
    end
  end
end
