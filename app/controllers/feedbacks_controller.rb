class FeedbacksController < ApplicationController
  layout 'admin'
  # GET /feedbacks
  # GET /feedbacks.xml
  def index
    @feedbacks = Feedback.paginate(:page=> params[:page], :per_page => 10, :conditions => {:parent_id => nil})

    respond_to do |format|
      format.html # index.html.erb
      format.xml { render :xml => @feedbacks }
    end
  end

  # GET /feedbacks/1
  # GET /feedbacks/1.xml
  def show
    @feedback = Feedback.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml { render :xml => @feedback }
    end
  end

  # GET /feedbacks/new
  # GET /feedbacks/new.xml
  def new
    @feedback = Feedback.new
    render :layout => 'application'
  end

  # GET /feedbacks/1/edit
  def edit
    @feedback = Feedback.find(params[:id])
  end

  # POST /feedbacks
  # POST /feedbacks.xml
  def create
    @feedback = Feedback.new(params[:feedback])

    if @feedback.save
      if admin? && @feedback.parent
        Mailer.reply_feedback(@feedback).deliver
        redirect_to(@feedback, :notice => 'Successfully sent!')
      else
        Mailer.send_feedback(@feedback).deliver
        redirect_to(contact_us_path, :notice => 'Successfully sent to support!')
      end
    else
      render :action => "new"
    end
  end

  # PUT /feedbacks/1
  # PUT /feedbacks/1.xml
  def update
    @feedback = Feedback.find(params[:id])

    respond_to do |format|
      if @feedback.update_attributes(params[:feedback])
        format.html { redirect_to(@feedback, :notice => t('general.label.item_created', :item => t('activerecord.models.feedback'))) }
        format.xml { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml { render :xml => @feedback.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /feedbacks/1
  # DELETE /feedbacks/1.xml
  def destroy
    @feedback = Feedback.find(params[:id])
    @feedback.destroy

    respond_to do |format|
      format.html { redirect_to(feedbacks_url) }
      format.xml { head :ok }
    end
  end
end
