interface Tab {
  key: string;
  label: string;
}

interface TabsProps {
  activeTab: string;
  onChange: (key: string) => void;
  tabs: Tab[];
}

export const Tabs = ({ activeTab, onChange, tabs }: TabsProps) => {
  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === tab.key
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-primary"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
