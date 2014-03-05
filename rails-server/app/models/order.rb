class Order
  include Mongoid::Document
  belongs_to :product

  field :coinbase_id, type: String
end
