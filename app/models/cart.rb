class Cart < ActiveRecord::Base
  has_many :line_items
  has_one :order

  def total_price
    # convert to array so it doesn't try to do sum on database directly
    line_items.to_a.sum(&:price)
  end

  def purchased
    line_items.each do |line_item|
      line_item.purchasable.purchased
    end
  end
end
