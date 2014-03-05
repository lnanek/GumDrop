class Product
	include Mongoid::Document
	
	belongs_to :user
	mount_uploader :blob, ProductUploader
end
