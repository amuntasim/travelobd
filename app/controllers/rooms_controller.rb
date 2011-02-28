class RoomsController < ApplicationController
    before_filter :require_user, :only =>[:edit,:create, :update, :destroy ]
    before_filter lambda { @active_nav = 'rooms'  }

    before_filter :load_item, :only =>[:show, :edit, :update, :destroy ]
    before_filter :check_ownership, :only => [:edit, :update, :destroy]

    #layout :choose_layout



    # GET /rooms/1
    # GET /rooms/1.xml
    def show

      respond_to do |format|
        format.html # show.html.erb
        format.xml  { render :xml => @room }
      end
    end

    # GET /rooms/new
    # GET /rooms/new.xml
    def new
      @room = Room.new(:hotel_id => params[:hotel_id])
      @features_for_room = Feature.for_room
      @my_hotels = Hotel.my_hotels(current_user.id)
      respond_to do |format|
        format.html # new.html.erb
        format.xml  { render :xml => @room }
      end
    end

    # GET /rooms/1/edit
    def edit
      @features_for_room = Feature.for_room
      @my_hotels = Hotel.my_hotels(current_user.id)
    end

    # POST /rooms
    # POST /rooms.xml
    def create
      @room = Room.new(params[:room])
      @room.user_id = current_user.id
      respond_to do |format|
        if @room.save
          format.html { redirect_to(@room, :notice => 'Room was successfully created.') }
          format.xml  { render :xml => @room, :status => :created, :location => @room }
        else
          format.html { render :action => "new" }
          format.xml  { render :xml => @room.errors, :status => :unprocessable_entity }
        end
      end
    end

    # PUT /rooms/1
    # PUT /rooms/1.xml
    def update
      params[:room][:feature_ids] ||= []

      respond_to do |format|
        if @room.update_attributes(params[:room])
          format.html { redirect_to(@room, :notice => 'Room was successfully updated.') }
          format.xml  { head :ok }
        else
          format.html { render :action => "edit" }
          format.xml  { render :xml => @room.errors, :status => :unprocessable_entity }
        end
      end
    end

    # DELETE /rooms/1
    # DELETE /rooms/1.xml
    def destroy
   
      @room.destroy

      respond_to do |format|
        format.html { redirect_to(rooms_url) }
        format.xml  { head :ok }
      end
    end

    def delete_asset
      asset = RoomAsset.find(params[:asset_id])
      asset.destroy
      render :nothing => true
    end

    def set_main_photo
      asset = RoomAsset.find(params[:asset_id])
      RoomAsset.update_all ['main = ?', false], ['room_id = ?',asset.room_id]
      asset.update_attribute(:main, true)
      render :nothing => true
    end

    private

    def load_item
      @room = Room.find(params[:id])
    end
    def check_ownership
      ownership_require(@room)
    end



  end
  
