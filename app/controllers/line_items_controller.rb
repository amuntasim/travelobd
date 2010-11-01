class LineItemsController < ApplicationController
  
  def create
    @line_item = LineItem.new(params[:line_item])

    respond_to do |format|
      if @line_item.save
        format.html { redirect_to(@line_item, :notice => 'Line item was successfully created.') }
        format.xml  { render :xml => @line_item, :status => :created, :location => @line_item }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @line_item.errors, :status => :unprocessable_entity }
      end
    end
  end

end
