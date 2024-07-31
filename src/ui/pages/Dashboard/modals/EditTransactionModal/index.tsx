import { Controller } from 'react-hook-form';
import { Transaction } from '../../../../../app/entities/Transaction';
import { Button } from '../../../../components/Button';
import { ConfirmDeleteModal } from '../../../../components/ConfirmDeleteModal';
import { DatePickerInput } from '../../../../components/DatePickerInput';
import { TrashIcon } from '../../../../components/icons/TrashIcon';
import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useEditTransactionModalController } from './useEditTransactionModalController';

interface EditTransactionModalProps {
  transaction: Transaction | null;
  open: boolean;
  onClose: () => void;
}

export function EditTransactionModal({
  transaction,
  onClose,
  open,
}: Readonly<EditTransactionModalProps>) {
  const {
    control,
    errors,
    handleSubmit,
    register,
    accounts,
    isPending,
    categories,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleDeleteTransaction,
    isPendingDelete,
    handleOpenDeleteModal,
  } = useEditTransactionModalController(transaction, onClose);

  const isExpense = transaction?.type === 'EXPENSE';

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        onClose={handleCloseDeleteModal}
        title={`Tem certeza que deseja excluir essa ${
          isExpense ? 'despesa' : 'receita'
        }?`}
        onConfirm={handleDeleteTransaction}
        isLoading={isPendingDelete}
      />
    );
  }

  return (
    <Modal
      title={isExpense ? 'Editar despesa' : 'Editar receita'}
      open={open}
      onClose={onClose}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[=0.5px] text-xs">
            Valor {isExpense ? 'da despesa' : 'da receita'}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[=0.5px] text-lg">R$</span>
            <Controller
              control={control}
              name="value"
              defaultValue={0}
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            {...register('name')}
            error={errors.name?.message}
            placeholder={isExpense ? 'Nome da despesa' : 'Nome da receita'}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                value={value}
                onChange={onChange}
                placeholder="Categoria"
                error={errors.categoryId?.message}
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                value={value}
                onChange={onChange}
                error={errors.bankAccountId?.message}
                placeholder={isExpense ? 'Pagar com' : 'Receber com'}
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { value } }) => (
              <DatePickerInput error={errors.date?.message} value={value} />
            )}
          />
        </div>

        <Button className="mt-6 w-full" type="submit" isPending={isPending}>
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
