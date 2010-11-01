class LineItem < ActiveRecord::Base
  belongs_to :purchasable, :polymorphic => true
  belongs_to :cart

  def full_price
    price * quantity
  end
end
