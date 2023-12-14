export default class BugFormData {
  public name: string = ''
  public project_key: string = import.meta.env.VITE_APP_PROJRECT_KEY
  public work_item_type_key: string = 'issue'
  public template_id: string = ''
  public role_owners: any[] = []
  public description: string = ''
  public group_type: string = 'auto'
  public priority: string = ''
  public priorityLabel: string = ''
  public systems: string = ''
  public systemsValue: string = ''

  constructor(params?: { [k in keyof Partial<BugFormData>]: BugFormData[k] }) {
    if (!params) {
      return this
    }

    Object.keys(this).forEach(key => {
      // @ts-ignore
      this[key] = params[key] ?? this[key]
    })
  }
}
