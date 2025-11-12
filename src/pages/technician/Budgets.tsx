import TechnicianLayout from '@/components/layout/TechnicianLayout';
import { BudgetForm } from '@/components/technician/BudgetForm';

const Budgets = () => {
  return (
    <TechnicianLayout title="Orçamentos">
      <div className="container mx-auto py-6">
        <BudgetForm />
      </div>
    </TechnicianLayout>
  );
};

export default Budgets;
