import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import GeneralSettings from './GeneralSettings'
import AccountSettings from './AccountSettings'

const tabs = [
  { label: 'General', component: GeneralSettings },
  { label: 'Compte', component: AccountSettings },
]

function Settings({ onClose }) {
  const { colors } = useTheme()
  const [activeTab, setActiveTab] = useState(tabs[0].label)

  const ActiveComponent = tabs.find((t) => t.label === activeTab)?.component

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        
        <button onClick={onClose}
          className="text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer">
          ×
        </button>
      </div>

      <div className="flex gap-1 mb-6 border-b" style={{ borderColor: colors.secondary + '30' }}>
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className="px-4 py-2 text-sm font-medium rounded-t-lg transition-colors cursor-pointer"
            style={{
              color: activeTab === tab.label ? colors.primary : '#6B7280',
              borderBottom: activeTab === tab.label ? `2px solid ${colors.primary}` : '2px solid transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  )
}

export default Settings