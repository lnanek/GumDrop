require 'httparty'
require 'json'

	class CoinbaseApi
		include HTTParty
		def initialize user
	      @user = user
	      @client = get_client
	      @token = OAuth2::AccessToken.new @client, @user.coinbase_access_token, { refresh_token: @user.coinbase_refresh_token }
	      if @user.coinbase_access_token.nil? or @user.coinbase_refresh_token.nil?
	      	authenticate
	      end
	    end


		def create_button name,price,currency,description=nil, custom=nil, options={}
			body = { 
				button: 
				{ 
					name: name,
					price_string: price,
					price_currency_iso: currency
				}
			}
			call :post,'api/v1/buttons', body
		end

		def balance 
			call :get,'api/v1/account/balance'
		end

		def create_order name,price,price_currency_iso
			body = {
				button:{
					name: name,
					price_string: price,
					price_currency_iso: price_currency_iso
				}
			}
			call :post, 'api/v1/orders',body
		end

		def get_order id
			puts "**** GEtting order from api/v1/orders/#{id}"
			call :get,"api/v1/orders/#{id}"
		end

		def call method_name, url, opts = {} 
			response = nil
			begin
				# Add support for expired, by storing more info on fetched tokens.
				# if @token.expired?
				# 	puts 'Token expired. refreshing'
				# 	refresh_token
				# end
				if method_name.eql? :post
					response = @token.post url,{ body: opts }
				elsif method_name.eql? :get
					response = @token.get url
				end
			rescue OAuth2::Error => e
				puts "Caught Exception #{e.description}"
				puts e
			end
			if response.nil? || response.status != 200
				begin
					refresh_token
					return call method_name, url
				rescue OAuth2::Error => e
					puts "Caught Exception on refresh"
					puts e
					@user.coinbase_code = nil
					@user.coinbase_access_token = nil
					@user.coinbase_refresh_token = nil
					@user.save
				end
			end
			return response
		end

		def authenticate
			redirect_uri = ENV['COINBASE_CALLBACK_URL']
			@token = @client.auth_code.get_token(@user.coinbase_code, redirect_uri: redirect_uri)
			save_tokens
		end

		def save_tokens
			@user.coinbase_access_token = @token.token
			@user.coinbase_refresh_token = @token.refresh_token
			@user.save
		end

		def refresh_token
			@token.refresh!	
			save_tokens
		end

		def get_client
			redirect_uri = ENV['COINBASE_CALLBACK_URL']
			client = OAuth2::Client.new(ENV['COINBASE_CLIENT_ID'], ENV['COINBASE_CLIENT_SECRET'], site: 'https://coinbase.com')
			client.auth_code.authorize_url(:redirect_uri => redirect_uri, :scope => "orders+merchant+buttons")
			return client
		end
	end
