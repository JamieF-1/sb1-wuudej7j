import React from 'react';

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

const TabsContext = React.createContext<{
  value: string;
  onChange: (value: string) => void;
}>({
  value: '',
  onChange: () => {},
});

export function Tabs({ defaultValue, children, className = '' }: TabsProps) {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, onChange: setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = '' }: TabsListProps) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ value, children, className = '' }: TabsTriggerProps) {
  const { value: selectedValue, onChange } = React.useContext(TabsContext);
  const isSelected = value === selectedValue;

  return (
    <button
      className={`${className} ${
        isSelected ? 'border-b-2 border-blue-500 text-blue-600' : ''
      }`}
      onClick={() => onChange(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: TabsContentProps) {
  const { value: selectedValue } = React.useContext(TabsContext);

  if (value !== selectedValue) return null;

  return <div>{children}</div>;
}