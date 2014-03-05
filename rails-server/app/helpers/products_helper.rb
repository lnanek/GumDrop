module ProductsHelper

	def get_balance
		begin
			coinbase = CoinbaseApi.new current_user
			coinbase.balance.parsed
		rescue Exception => e
			puts 'Exception Caught'
			puts e
			current_user.coinbase_code = nil
			current_user.coinbase_access_token = nil
			current_user.coinbase_refresh_token = nil
			current_user.save
		end
	end

	def get_product_buy_link product
		"#{ENV["DOMAIN_NAME"]}/products/public/#{product.id}"
	end

	def connect_to_coinbase_visible?
		current_user.coinbase_access_token.nil? or current_user.coinbase_refresh_token.nil? or current_user.coinbase_code.nil?
	end
end
