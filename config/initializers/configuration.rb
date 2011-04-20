
#require "smtp_tls"

ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.perform_deliveries = true
ActionMailer::Base.raise_delivery_errors = false
ActionMailer::Base.default_charset = "utf-8"

ActionMailer::Base.smtp_settings = {
    #:tls => true,
    :address => "smtp.gmail.com",
    :port => "587",
    :domain => "travelobd.com",
    :authentication => :plain,
    :user_name => "lorem.ipsume@gmail.com",
    :password => "lorem123456"
}
require "i18n/backend/fallbacks"
I18n::Backend::Simple.send(:include, I18n::Backend::Fallbacks)


#language
LOCALES_DIRECTORY = "#{Rails.root}/config/locales/"
require 'extend_class'



