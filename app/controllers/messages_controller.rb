class MessagesController < ApplicationController
  before_filter :require_user
  before_filter :load_message, :only =>[:show, :edit, :update, :destroy]
  layout 'dashboard', :only => 'show'
  # GET /messages
  # GET /messages.xml
  def index
    @messages = Message.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml { render :xml => @messages }
    end
  end

  # GET /messages/1
  # GET /messages/1.xml
  def show
    unless @message.read?
      @message.update_attribute(:read, true)
    end

    respond_to do |format|
      format.html # show.html.erb
      format.xml { render :xml => @message }
    end
  end

  # GET /messages/new
  # GET /messages/new.xml
  def new
    @message = Message.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml { render :xml => @message }
    end
  end

  # GET /messages/1/edit
  def edit
    @message = Message.find(params[:id])
  end

  # POST /messages
  # POST /messages.xml
  def create
    @message = Message.new(params[:message])
    @message.created_by = current_user.id if current_user
    @status_div = params[:message_status_div] || 'message_status'
    respond_to do |format|
      if (current_user || params[:spam_check].to_i == 7) && @message.save
        @no_error = true
        Mailer.send_message(@message).deliver if message_receiver_expects_email?(@message)
        format.html { redirect_to(@message.root, :notice => 'Message was successfully created.') }
        format.js
      else
        @no_error = false
        format.html { render :action => "new" }
        format.js
      end
    end
  end

  # PUT /messages/1
  # PUT /messages/1.xml
  def update

    respond_to do |format|
      if @message.update_attributes(params[:message])
        format.html { redirect_to(@message, :notice => 'Message was successfully updated.') }
        format.xml { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml { render :xml => @message.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /messages/1
  # DELETE /messages/1.xml
  def destroy
    @message.destroy

    respond_to do |format|
      format.html { redirect_to(messages_url) }
      format.xml { head :ok }
    end
  end

  private
  def load_message
    @message = Message.find(params[:id])
    if @message.user_id != current_user.id
      redirect_to root_path, :notice=> 'invalid access'
    end
  end
end
