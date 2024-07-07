import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useDashboard } from "../DashboardContext/useDashBoard";

export function Fab() {
  const { openNewAccountModal } = useDashboard();
  return (
    <div className="fixed bottom-8 right-8">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="bg-teal-900 p-4 rounded-full w-12 h-12 flex items-center justify-center text-white">
            <PlusIcon className="w-6 h-6" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item className="gap-2">
            <CategoryIcon type="expense" />
            Nova despesa
          </DropdownMenu.Item>
          <DropdownMenu.Item className="gap-2">
            <CategoryIcon type="income" />
            Nova receita
          </DropdownMenu.Item>
          <DropdownMenu.Item className="gap-2" onSelect={openNewAccountModal}>
            <BankAccountIcon />
            Nova conta
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
