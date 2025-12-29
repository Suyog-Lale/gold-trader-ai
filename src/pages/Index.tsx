import { DashboardHeader } from '@/components/DashboardHeader';
import { TradingChart } from '@/components/TradingChart';
import { AISignalPanel } from '@/components/AISignalPanel';
import { LearningLogTable } from '@/components/LearningLogTable';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />
      
      <div className="flex-1 flex">
        {/* Main Chart Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 min-h-[400px]">
            <TradingChart />
          </div>
          
          {/* Learning Log */}
          <div className="p-4 border-t border-border">
            <LearningLogTable />
          </div>
        </div>

        {/* AI Signal Side Panel */}
        <div className="w-80 xl:w-96 flex-shrink-0">
          <AISignalPanel />
        </div>
      </div>
    </div>
  );
};

export default Index;
