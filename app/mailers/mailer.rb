class Mailer < ActionMailer::Base

  def ownership_acceptance_instructions(ownership_request)
    @link = eval "#{ownership_request.resource_type.underscore.downcase}_url(#{ownership_request.resource_id})"
    @accept_url = accept_ownership_request_url(ownership_request.token)
    mail(:to => "#{ownership_request.name} <#{ownership_request.email}>", :subject => "Acceptance of ownership request", :from => "Travelobd Notifier <cst@travelobd.com>")
  end

  def password_reset_instructions(user)
    @edit_password_reset_url = edit_password_reset_url(user.perishable_token)
    mail(:to => "#{user.full_name} <#{user.email}>", :subject => "Password Reset Instructions", :from => "Travelobd Notifier <cst@travelobd.com>")
  end

  def send_message(msg)
    @message = msg
    mail(:to => "#{@message.owner.full_name} <#{@message.owner.email}>", :subject => @message.title, :from => @message.user ? "#{@message.user.full_name} <#{@message.user.email}>" : "#{@message.name} <#{@message.email}>")
  end

  def send_feedback(feedback)
    @feedback = feedback
    mail(:to => "Support <ahmed2tul@gmail.com>", :subject => @feedback.subject, :from => "#{@feedback.name} <#{@feedback.email}>")
  end

  def reply_feedback(reply)
    feedback = reply.parent
    @reply = reply
    mail(:to => "#{feedback.name}<#{feedback.email}>", :subject => reply.subject, :from => "#{reply.name} <#{reply.email}>")
  end

  def send_to_friend(params, user)
    @message = params[:message]
    @link = eval "#{params[:item_type]}_url(#{params[:item_id]})"
    mail(:to => params[:email].split(','), :subject => "A link from #{ user ? user.full_name : 'your friend'} ", :from => user ? "#{user.full_name} <#{user.email}>" : "#{params[:from]}>")
  end

  def ownership_request(ownership_request)
    @ownership_request = ownership_request
    @link = eval "#{ownership_request.resource_type.underscore.downcase}_url(#{ownership_request.resource_id})"
    mail(:to => "webmaster@travelobd.com", :subject => "Ownership request from #{ ownership_request.user ? ownership_request.user.full_name : ownership_request.name} ", :from => ownership_request.user ? "#{ownership_request.user.full_name} <#{ownership_request.user.email}>" : "#{ownership_request.email}>")
  end

end
