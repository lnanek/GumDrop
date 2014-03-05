require 'oauth2'
require 'coinbase_api'
class CoinbaseController < ApplicationController

	before_filter :authenticate_user!

	def code
		current_user.coinbase_code = params[:code]
		current_user.save
		coinbase_api = CoinbaseApi.new current_user
		redirect_to home_index_path
	end


end
