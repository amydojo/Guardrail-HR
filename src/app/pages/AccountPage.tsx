import { useState } from 'react';
import { ChevronRight, Check, Lock } from 'lucide-react';

export function AccountPage() {
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  
  // Mock data - would come from auth/database in production
  const accountData = {
    owner: {
      name: 'Sarah Chen',
      email: 'sarah@company.com',
      role: 'Owner'
    },
    company: {
      name: 'Acme Coffee Roasters',
      state: 'California',
      employeeCount: '12-25',
      industry: 'Food & Beverage'
    },
    subscription: {
      plan: 'Free',
      status: 'Active',
      modules: {
        wageHour: true,
        templatesGuides: false,
        exportsBreakdowns: false
      }
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="mx-auto max-w-[1080px] px-6 xl:px-8 py-12 sm:py-16 xl:py-20">
        
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-[28px] sm:text-[32px] font-semibold text-theme-text-1 mb-2 tracking-tight leading-tight">Account</h1>
          <p className="text-[15px] text-theme-text-2 leading-[1.65]">
            Manage your account details, access, and subscription.
          </p>
        </div>

        <div className="space-y-6">
          
          {/* Account Owner */}
          <section className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-6">
            <h2 className="text-[17px] font-semibold text-theme-text-1 mb-5 tracking-tight leading-tight">Account owner</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-[14px] text-theme-text-3 mb-1">Name</div>
                  <div className="text-[15px] text-theme-text-1">{accountData.owner.name}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-[14px] text-theme-text-3 mb-1">Email address</div>
                  <div className="text-[15px] text-theme-text-1">{accountData.owner.email}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-[14px] text-theme-text-3 mb-1">Role</div>
                  <div className="text-[15px] text-theme-text-1">{accountData.owner.role}</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-theme-border-2 space-y-2">
              <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-theme-surface-2 border border-theme-border-1 hover:bg-theme-surface-1 transition-colors">
                <span className="text-[14px] text-theme-text-1">Change password</span>
                <ChevronRight className="w-4 h-4 text-theme-icon-2" />
              </button>
              
              <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-theme-surface-2 border border-theme-border-1 hover:bg-theme-surface-1 transition-colors">
                <span className="text-[14px] text-theme-text-1">Manage sign-in</span>
                <ChevronRight className="w-4 h-4 text-theme-icon-2" />
              </button>
            </div>
          </section>

          {/* Company Details */}
          <section className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[17px] font-semibold text-theme-text-1 tracking-tight leading-tight">Company</h2>
              {!isEditingCompany && (
                <button
                  onClick={() => setIsEditingCompany(true)}
                  className="text-[13px] text-theme-accent hover:text-theme-accent-hover transition-colors"
                >
                  Edit
                </button>
              )}
            </div>
            
            {isEditingCompany ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] text-theme-text-3 mb-2">Company name</label>
                  <input
                    type="text"
                    defaultValue={accountData.company.name}
                    className="w-full px-4 py-2.5 rounded-xl bg-theme-surface-2 border border-theme-border-1 text-[15px] text-theme-text-1 placeholder:text-theme-text-3 focus:outline-none focus:border-theme-accent transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-[13px] text-theme-text-3 mb-2">Primary work location</label>
                  <select
                    defaultValue={accountData.company.state}
                    className="w-full px-4 py-2.5 rounded-xl bg-theme-surface-2 border border-theme-border-1 text-[15px] text-theme-text-1 focus:outline-none focus:border-theme-accent transition-colors"
                  >
                    <option value="California">California</option>
                    <option value="New York">New York</option>
                    <option value="Texas">Texas</option>
                    <option value="Florida">Florida</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-[13px] text-theme-text-3 mb-2">Number of employees (optional)</label>
                  <select
                    defaultValue={accountData.company.employeeCount}
                    className="w-full px-4 py-2.5 rounded-xl bg-theme-surface-2 border border-theme-border-1 text-[15px] text-theme-text-1 focus:outline-none focus:border-theme-accent transition-colors"
                  >
                    <option value="">Select range</option>
                    <option value="1-5">1-5</option>
                    <option value="6-10">6-10</option>
                    <option value="11-25">11-25</option>
                    <option value="26-50">26-50</option>
                    <option value="51-100">51-100</option>
                    <option value="100+">100+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-[13px] text-theme-text-3 mb-2">Industry (optional)</label>
                  <input
                    type="text"
                    defaultValue={accountData.company.industry}
                    placeholder="e.g., Retail, Healthcare, Technology"
                    className="w-full px-4 py-2.5 rounded-xl bg-theme-surface-2 border border-theme-border-1 text-[15px] text-theme-text-1 placeholder:text-theme-text-3 focus:outline-none focus:border-theme-accent transition-colors"
                  />
                </div>
                
                <p className="text-[12px] text-theme-text-3 pt-2">
                  This information helps tailor assessments and resources to your business.
                </p>

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => setIsEditingCompany(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-theme-accent text-theme-accent-text-on text-[14px] font-medium hover:bg-theme-accent-hover transition-colors"
                  >
                    Save changes
                  </button>
                  <button
                    onClick={() => setIsEditingCompany(false)}
                    className="px-4 py-2.5 rounded-xl bg-theme-surface-2 border border-theme-border-1 text-[14px] font-medium text-theme-text-1 hover:bg-theme-surface-1 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-[14px] text-theme-text-3 mb-1">Company name</div>
                    <div className="text-[15px] text-theme-text-1">{accountData.company.name}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-[14px] text-theme-text-3 mb-1">Primary work location</div>
                    <div className="text-[15px] text-theme-text-1">{accountData.company.state}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-[14px] text-theme-text-3 mb-1">Number of employees</div>
                    <div className="text-[15px] text-theme-text-1">{accountData.company.employeeCount}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-[14px] text-theme-text-3 mb-1">Industry</div>
                    <div className="text-[15px] text-theme-text-1">{accountData.company.industry}</div>
                  </div>
                </div>

                <p className="text-[12px] text-theme-text-3 pt-2">
                  This information helps tailor assessments and resources to your business.
                </p>
              </div>
            )}
          </section>

          {/* Subscription & Access */}
          <section className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-6">
            <h2 className="text-[17px] font-semibold text-theme-text-1 mb-5 tracking-tight leading-tight">Plan & access</h2>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[15px] text-theme-text-1">{accountData.subscription.plan}</span>
                <span className="text-[13px] text-theme-text-3">•</span>
                <span className="text-[13px] text-theme-text-2">{accountData.subscription.status}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between py-2">
                <span className="text-[14px] text-theme-text-3">Wage & Hour module</span>
                {accountData.subscription.modules.wageHour ? (
                  <Check className="w-4 h-4 text-theme-success" />
                ) : (
                  <Lock className="w-4 h-4 text-theme-icon-2" />
                )}
              </div>
              
              <div className="flex items-center justify-between py-2">
                <span className="text-[14px] text-theme-text-3">Templates & guides</span>
                {accountData.subscription.modules.templatesGuides ? (
                  <Check className="w-4 h-4 text-theme-success" />
                ) : (
                  <Lock className="w-4 h-4 text-theme-icon-2" />
                )}
              </div>
              
              <div className="flex items-center justify-between py-2">
                <span className="text-[14px] text-theme-text-3">Exports & breakdowns</span>
                {accountData.subscription.modules.exportsBreakdowns ? (
                  <Check className="w-4 h-4 text-theme-success" />
                ) : (
                  <Lock className="w-4 h-4 text-theme-icon-2" />
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-theme-border-2 space-y-2">
              <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-theme-accent text-theme-accent-text-on hover:bg-theme-accent-hover transition-colors">
                <span className="text-[14px] font-medium">Manage billing</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-transparent border border-theme-border-1 text-theme-text-2 hover:bg-theme-surface-2 transition-colors">
                <span className="text-[14px]">Upgrade plan</span>
                <ChevronRight className="w-4 h-4 text-theme-icon-2" />
              </button>
            </div>
          </section>

          {/* Users & Permissions */}
          <section className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-6">
            <h2 className="text-[17px] font-semibold text-theme-text-1 mb-5 tracking-tight leading-tight">Users</h2>
            
            <div className="mb-6">
              <div className="flex items-center gap-3 py-3">
                <div className="w-10 h-10 rounded-full bg-theme-accent-surface flex items-center justify-center">
                  <span className="text-[15px] font-medium text-theme-accent">
                    {accountData.owner.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="text-[14px] text-theme-text-1">{accountData.owner.name}</div>
                  <div className="text-[13px] text-theme-text-2">{accountData.owner.email}</div>
                </div>
                <div className="text-[13px] text-theme-text-3">Owner</div>
              </div>
            </div>

            <div className="pt-4 border-t border-theme-border-2">
              <button
                disabled
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-theme-surface-2 border border-theme-border-2 cursor-not-allowed"
              >
                <span className="text-[14px] text-theme-text-3">Invite team members</span>
                <span className="text-[12px] text-theme-text-3">Coming soon</span>
              </button>
            </div>
          </section>

          {/* Data & Privacy */}
          <section className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-6">
            <h2 className="text-[17px] font-semibold text-theme-text-1 mb-2 tracking-tight leading-tight">Data & privacy</h2>
            <p className="text-[13px] text-theme-text-3 mb-5">
              You're always in control of your information.
            </p>
            
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-theme-surface-2 border border-theme-border-1 hover:bg-theme-surface-1 transition-colors">
                <span className="text-[14px] text-theme-text-1">Export your data</span>
                <ChevronRight className="w-4 h-4 text-theme-icon-2" />
              </button>
              
              <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-theme-surface-2 border border-theme-border-1 text-theme-danger hover:bg-theme-surface-1 transition-colors">
                <span className="text-[14px] text-theme-danger">Delete account</span>
                <ChevronRight className="w-4 h-4 text-theme-danger" />
              </button>
            </div>
          </section>

          {/* Support & System */}
          <section className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-6">
            <h2 className="text-[17px] font-semibold text-theme-text-1 mb-5 tracking-tight leading-tight">Support</h2>
            
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-theme-surface-2 border border-theme-border-1 hover:bg-theme-surface-1 transition-colors">
                <span className="text-[14px] text-theme-text-1">Contact support</span>
                <ChevronRight className="w-4 h-4 text-theme-icon-2" />
              </button>
              
              <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-theme-surface-2 border border-theme-border-1 hover:bg-theme-surface-1 transition-colors">
                <span className="text-[14px] text-theme-text-1">Product updates</span>
                <ChevronRight className="w-4 h-4 text-theme-icon-2" />
              </button>
            </div>

            <div className="my-4 border-t border-theme-border-2"></div>
              
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-theme-surface-2 border border-theme-border-1 hover:bg-theme-surface-1 transition-colors">
                <span className="text-[14px] text-theme-text-1">Legal & disclaimers</span>
                <ChevronRight className="w-4 h-4 text-theme-icon-2" />
              </button>

              <div className="pt-2">
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-theme-surface-2 border border-theme-border-1 hover:bg-theme-surface-1 transition-colors">
                  <span className="text-[14px] text-theme-text-1">Log out</span>
                  <ChevronRight className="w-4 h-4 text-theme-icon-2" />
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
