module ApplicationHelper
	def link_to_coinbase_auth
		coinbase_client_id = ENV["COINBASE_CLIENT_ID"]
		coinbase_callback_url = ENV["COINBASE_CALLBACK_URL"]
		"https://coinbase.com/oauth/authorize?response_type=code&client_id=#{coinbase_client_id}&redirect_uri=#{coinbase_callback_url}&scope=orders+merchant+buttons"
	end
end
