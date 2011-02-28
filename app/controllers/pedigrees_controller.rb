class PedigreesController < ApplicationController
   before_filter :require_admin_user, :except=> []
  layout 'admin'
  # GET /pedigrees
  # GET /pedigrees.xml
  def index
    @pedigrees = Pedigree.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @pedigrees }
    end
  end

  # GET /pedigrees/1
  # GET /pedigrees/1.xml
  def show
    @pedigree = Pedigree.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @pedigree }
    end
  end

  # GET /pedigrees/new
  # GET /pedigrees/new.xml
  def new
    @pedigree = Pedigree.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @pedigree }
    end
  end

  # GET /pedigrees/1/edit
  def edit
    @pedigree = Pedigree.find(params[:id])
  end

  # POST /pedigrees
  # POST /pedigrees.xml
  def create
    @pedigree = Pedigree.new(params[:pedigree])

    respond_to do |format|
      if @pedigree.save
        format.html { redirect_to(@pedigree, :notice => 'Pedigree was successfully created.') }
        format.xml  { render :xml => @pedigree, :status => :created, :location => @pedigree }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @pedigree.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /pedigrees/1
  # PUT /pedigrees/1.xml
  def update
    @pedigree = Pedigree.find(params[:id])

    respond_to do |format|
      if @pedigree.update_attributes(params[:pedigree])
        format.html { redirect_to(@pedigree, :notice => 'Pedigree was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @pedigree.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /pedigrees/1
  # DELETE /pedigrees/1.xml
  def destroy
    @pedigree = Pedigree.find(params[:id])
    @pedigree.destroy

    respond_to do |format|
      format.html { redirect_to(pedigrees_url) }
      format.xml  { head :ok }
    end
  end
end
