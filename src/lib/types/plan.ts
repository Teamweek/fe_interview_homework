type User = {
  color_id: number
  created_at: string
  email: string
  email_verified_at: null
  has_picture: boolean
  id: number
  initials: string
  invitations: []
  legal_consent_pending: boolean
  manager: null
  name: string
  picture_url: string
  preferences: {
    hide_weekends: boolean
    highlight_done_tasks: boolean
    onboarding_emails: boolean
    pin_me_on_top: boolean
    selected_account_id: null
    selected_group_id: null
    selected_project_id: null
    start_of_week: number
    task_notifications: boolean
    timezone: string
    vision_impaired: boolean
    vision_impaired_big_font: boolean
    vision_impaired_borders: boolean
    vision_impaired_contrast_text: boolean
    vision_impaired_light_colors: boolean
    vision_impaired_patterns: boolean
    vision_impaired_today: boolean
    vision_impaired_weekends: boolean
  }
  toggl_id: string
  updated_at: string
  workspaces: Workspace[]
}

type Workspace = {
  active: boolean
  created_at: string
  custom_colors: []
  id: number
  membership_id: number
  minutes_per_work_day: null
  name: string
  pricing_system: string
  role: string
  suspended_at: null
  updated_at: string
  working_minutes_per_friday: number
  working_minutes_per_monday: number
  working_minutes_per_saturday: number
  working_minutes_per_sunday: number
  working_minutes_per_thursday: number
  working_minutes_per_tuesday: number
  working_minutes_per_wednesday: number
}
