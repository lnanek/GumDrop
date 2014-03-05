
require 'coinbase_api'

class ProductsController < ApplicationController
	before_filter :authenticate_user! , :except => [:show_public, :get_order, :create_order]

	def new
		
	end

	def create	
		@product = Product.new(params[:product])
		@product.user_id = current_user.id
		if @product.save
			redirect_to @product
		else
			@product.errors.each { |k, v| errors << v }
			puts @product.errors
			@product = errors.join("\n")
			respond_to do |format|
				format.html { render :new }
				format.js
			end
		end
	end

	def show
		@product = Product.find(params[:id])
		#content = @product.blob.read
	end

	def download
		@product = Product.find(params[:id])
		content = @product.blob.read
		filename = Pathname.new(@product.blob.inspect).basename.to_s
		send_data content, filename: filename
	end

	def show_public
		@product = Product.find(params[:id])
	end

end
