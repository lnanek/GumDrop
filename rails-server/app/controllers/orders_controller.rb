require 'coinbase_api'

class OrdersController < ApplicationController

	def create
		puts "Params #{params}"
		product = Product.find(params[:product_id])
		user = User.find(product.user_id)
		coinbase = CoinbaseApi.new user
		begin
			response = coinbase.create_order(product.name, product.price, 'USD')
			order = Order.new product: product.id
			order.coinbase_id = response.parsed['order']['id']
			order.save
			render :json => response.parsed
		rescue OAuth2::Error => e
			puts e
		end
	end

	def get
		order = Order.find_by coinbase_id: params[:id]
		product = Product.find(order.product_id)
		user = User.find(product.user_id)
		coinbase = CoinbaseApi.new user
		response = coinbase.get_order order.coinbase_id
		render :json => response.parsed
	end

end
