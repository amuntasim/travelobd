class AdVideosController < ApplicationController
  before_filter :require_admin_user, :except=> []
  layout 'admin'
  # GET /ad_videos
  # GET /ad_videos.xml
  def index
    @ad_videos = AdVideo.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @ad_videos }
    end
  end

  # GET /ad_videos/1
  # GET /ad_videos/1.xml
  def show
    @ad_video = AdVideo.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @ad_video }
    end
  end

  # GET /ad_videos/new
  # GET /ad_videos/new.xml
  def new
    @ad_video = AdVideo.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @ad_video }
    end
  end

  # GET /ad_videos/1/edit
  def edit
    @ad_video = AdVideo.find(params[:id])
  end

  # POST /ad_videos
  # POST /ad_videos.xml
  def create
    @ad_video = AdVideo.new(params[:ad_video])

    respond_to do |format|
      if @ad_video.save
        format.html { redirect_to(@ad_video, :notice => 'Ad video was successfully created.') }
        format.xml  { render :xml => @ad_video, :status => :created, :location => @ad_video }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @ad_video.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /ad_videos/1
  # PUT /ad_videos/1.xml
  def update
    @ad_video = AdVideo.find(params[:id])

    respond_to do |format|
      if @ad_video.update_attributes(params[:ad_video])
        format.html { redirect_to(@ad_video, :notice => 'Ad video was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @ad_video.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /ad_videos/1
  # DELETE /ad_videos/1.xml
  def destroy
    @ad_video = AdVideo.find(params[:id])
    @ad_video.destroy

    respond_to do |format|
      format.html { redirect_to(ad_videos_url) }
      format.xml  { head :ok }
    end
  end
end
