FriendlyId::ActiveRecordAdapter::SluggedModel.module_eval do
  def locale
    I18n.locale
  end


  def to_param_from_slug
    custom_friendly_id
  end

  def custom_friendly_id
    f_slug = slugs.where(:scope => I18n.locale.to_s).last
    if f_slug
      f_slug.to_friendly_id
    else
      slug ? slug.to_friendly_id : id.to_s
    end
  end
end



