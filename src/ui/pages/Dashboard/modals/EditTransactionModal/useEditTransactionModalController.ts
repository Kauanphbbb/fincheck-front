import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { Transaction } from '../../../../../app/entities/Transaction';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { transactionsService } from '../../../../../app/services/transactionsService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';

const schema = z.object({
  value: z.union([z.string().min(1, 'Informe o valor'), z.number()]),
  name: z.string().min(1, 'Informe o nome'),
  categoryId: z.string().min(1, 'Selecione uma categoria'),
  bankAccountId: z.string().min(1, 'Selecione uma conta'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void
) {
  const {
    register,
    handleSubmit: handleSubmitHookForm,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: transaction?.name,
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.category?.id,
      date: transaction ? new Date(transaction.date) : new Date(),
      value: transaction?.value,
    },
  });

  const { accounts } = useBankAccounts();

  const { categories: categoriesList } = useCategories();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { mutateAsync: updateTransaction, isPending } = useMutation({
    mutationFn: transactionsService.update,
  });

  const { isPending: isPendingDelete, mutateAsync: removeTransaction } =
    useMutation({
      mutationFn: transactionsService.remove,
    });

  const queryClient = useQueryClient();

  const handleSubmit = handleSubmitHookForm(async (data) => {
    try {
      await updateTransaction({
        ...data,
        id: transaction!.id,
        type: transaction!.type,
        value: currencyStringToNumber(data.value),
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success(
        transaction!.type === 'INCOME'
          ? 'Receita editada com sucesso'
          : 'Despesa editada com sucesso!'
      );
      onClose();
    } catch {
      toast.error(
        transaction!.type === 'INCOME'
          ? 'Erro ao editar a receita'
          : 'Erro ao editar a despesa'
      );
    }
  });

  const categories = useMemo(
    () =>
      categoriesList.filter((category) => category.type === transaction?.type),
    [categoriesList, transaction]
  );

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id);

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Transação apagada com sucesso!');
      onClose();
    } catch {
      toast.error('Erro ao apagar a transação!');
    }
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isPending,
    isDeleteModalOpen,
    isPendingDelete,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
  };
}
