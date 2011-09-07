module ApplicationHelper

  def meta_tags_for_fb(title, type, url, image)
    meta_tags = ""
    meta_tags += "<meta property=\"og:title\" content=\"#{title}\"/>"
    meta_tags += "<meta property=\"og:type\" content=\"#{type}\"/>"
    meta_tags += "<meta property=\"og:url\" content=\"#{url}\"/>"
    meta_tags += "<meta property=\"og:image\" content=\"#{image}\"/>"
    meta_tags += "<meta property=\"og:site_name\" content=\"Travelobd\"/>"
    meta_tags += "<meta property=\"fb:app_id\" content=\"106632129690\"/>  "
    meta_tags
  end

  def title(page_title)
    @title = page_title
  end

  def ad_steps_class(current_step, position)
    css_class = ''
    css_class += 'selMenu_g' if current_step > position
    css_class += ' selMenu' if current_step == position
    css_class
  end

  def active_inactive_navigation(nav_name)
    @active_nav == nav_name ? 'select' : ''
  end

  def add_object_link(name, form, object, partial, where, a_class='addMoreImage')
    html = render(:partial => partial, :locals => {:form => form}, :object => object)
    link_to_function name, %{ if($(this).checkVideosAllowed()){
      var new_object_id = new Date().getTime() ;
      var html = jQuery(#{js html}.replace(/index_to_replace_with_js/g, new_object_id)).hide();
      html.appendTo(jQuery("#{where}")).slideDown('slow');}
    }, :class=> a_class, :href => 'javascript:void(0)'
  end

  def js(data)
    if data.respond_to? :to_json
      data.to_json
    else
      data.inspect.to_json
    end
  end

  def timeago(time, options = {})
    start_date = options.delete(:start_date) || Time.new
    date_format = options.delete(:date_format) || :default
    delta_minutes = (start_date.to_i - time.to_i).floor / 60
    if delta_minutes.abs <= (8724*60)
      distance = distance_of_time_in_words(delta_minutes)
      if delta_minutes < 0
        return "#{distance} from now"
      else
        return "#{distance} ago"
      end
    else
      return "on #{DateTime.now.to_formatted_s(date_format)}"
    end
  end

  def fix_language_switch
    if (session[:tmp_previous_request_method].to_s == 'post')
      return "alert('#{t('language_switching_not_allowed')}'); return false;"
    end
    return 'return true;'
  end

  def feature_list(obj)
    html = ''
    obj.features.each do |feature|
      html += "<span class='feature'><li>#{feature.name}</li></span>"
    end
    raw(html)
  end

  def user_can_edit?(obj)
    current_user && obj.user_id == current_user.id
  end

  def localized_item_header(obj, defaults = {})
    model = obj.class.model_name.human
    translatable_str = if obj.new_record?
                         :"helpers.item_header.new"
                       else
                         :"helpers.item_header.existing"
                       end

    I18n.t(translatable_str, :model => model, :default => defaults)
  end

  def can_edit?(item)
    current_user && (item.user_id == current_user.id || admin?)
  end

  def discount_str(item)
    if item.discount && item.discount_till
      "#{item.discount} #{t('general.label.till_discount_date', :date => item.discount_till.to_s.bangla)}"
    elsif item.discount
      item.discount
    end
  end
end


