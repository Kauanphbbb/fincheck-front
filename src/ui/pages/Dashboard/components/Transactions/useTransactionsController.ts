import { useEffect, useState } from 'react';
import { Transaction } from '../../../../../app/entities/Transaction';
import { useTransactions } from '../../../../../app/hooks/useTransactions';
import { TransactionFilters } from '../../../../../app/services/transactionsService/getAll';
import { useDashboard } from '../DashboardContext/useDashBoard';

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [transactionBeingEdited, setTransactionBeingEdited] =
    useState<null | Transaction>(null);

  const [filters, setFilters] = useState<TransactionFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const { transactions, isFetching, isLoading, refetchTransactions } =
    useTransactions(filters);

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  function handleChangeFilters<TFilter extends keyof TransactionFilters>(
    filter: TFilter
  ) {
    return (value: TransactionFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters((prev) => ({ ...prev, [filter]: value }));
    };
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleApplyFilters(filters: {
    bankAccountId?: string;
    year: number;
  }) {
    handleChangeFilters('year')(filters.year);
    handleChangeFilters('bankAccountId')(filters.bankAccountId);
    handleCloseFiltersModal();
  }

  function handleOpenEditModal(transaction: Transaction) {
    setTransactionBeingEdited(transaction);
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setTransactionBeingEdited(null);
    setIsEditModalOpen(false);
  }

  return {
    areValuesVisible,
    isInitialLoading: isLoading,
    transactions,
    isLoading: isFetching,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isFiltersModalOpen,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    transactionBeingEdited,
    isEditModalOpen,
    handleOpenEditModal,
    handleCloseEditModal,
  };
}
