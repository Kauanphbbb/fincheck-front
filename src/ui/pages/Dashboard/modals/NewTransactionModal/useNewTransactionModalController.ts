import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { queryClient } from '../../../../../app/config/queryClient';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { transactionsService } from '../../../../../app/services/transactionsService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { useDashboard } from '../../components/DashboardContext/useDashBoard';

const schema = z.object({
  value: z.union([z.string().min(1, 'Informe o valor'), z.number()]),
  name: z.string().min(1, 'Informe o nome'),
  categoryId: z.string().min(1, 'Selecione uma categoria'),
  bankAccountId: z.string().min(1, 'Selecione uma conta'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const {
    register,
    handleSubmit: handleSubmitHookForm,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { accounts } = useBankAccounts();

  const { categories: categoriesList } = useCategories();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: transactionsService.create,
  });

  const handleSubmit = handleSubmitHookForm(async (data) => {
    try {
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success(
        newTransactionType === 'INCOME' ? 'Receita criada' : 'Despesa criada'
      );
      closeNewTransactionModal();
      reset();
    } catch {
      toast.error(
        newTransactionType === 'INCOME'
          ? 'Erro ao criar a receita'
          : 'Erro ao criar a despesa'
      );
    }
  });

  const categories = useMemo(
    () =>
      categoriesList.filter((category) => category.type === newTransactionType),
    [categoriesList, newTransactionType]
  );

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isPending,
  };
}
