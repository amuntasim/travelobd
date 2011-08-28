class Mailer < ActionMailer::Base

  def password_reset_instructions(user)
    @edit_password_reset_url = edit_password_reset_url(user.perishable_token)
    mail(:to => "#{user.full_name} <#{user.email}>", :subject => "Password Reset Instructions", :from => "Travelobd Notifier <cst@everyequestrian.com>")
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

end
