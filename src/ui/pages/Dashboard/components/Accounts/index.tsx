import { PlusIcon } from '@radix-ui/react-icons';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { Spinner } from '../../../../components/Spinner';
import { EyeIcon } from '../../../../components/icons/EyeIcon';
import { AccountCard } from '../AccountCard';
import { SliderNavigation } from '../SliderNavigation';
import { useAccountsController } from './useAccountsController';

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading,
    accounts,
    currentBalance,
    openNewAccountModal,
  } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      {isLoading && (
        <div className="flex items-center justify-center h-full w-full">
          <Spinner className="text-teal-950/50 fill-white w-10 h-10" />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="tracking-[-0.5px] text-white block">
              Saldo total
            </span>
            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  'text-2xl tracking-[-1px] text-white',
                  !areValuesVisible && 'blur-md'
                )}
              >
                {formatCurrency(currentBalance)}
              </strong>
              <button
                className="w-8 h-8 flex justify-center items-center"
                onClick={toggleValuesVisibility}
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            {accounts.length === 0 && (
              <>
                <div className="mb-4">
                  <strong className="text-white tracking-[-1px] text-lg">
                    Minhas contas
                  </strong>
                </div>

                <button
                  onClick={openNewAccountModal}
                  className="mt-4 h-52 border-teal-600 rounded-2xl border-2 border-dashed flex flex-col justify-center items-center gap-4 text-white"
                >
                  <div className="w-11 h-11 rounded-full border-2 border-dashed border-white flex justify-center items-center">
                    <PlusIcon className="w-6 h-6" />
                  </div>
                  <span className="font-medium tracking-[-0.5px] block w-32 text-center">
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}

            {accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={windowWidth <= 500 ? 1.2 : 2.2}
                  onSlideChange={(swiper) =>
                    setSliderState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd,
                    })
                  }
                >
                  <div
                    className="flex justify-between items-center mb-4"
                    slot="container-start"
                  >
                    <strong className="text-white tracking-[-1px] text-lg">
                      Minhas contas
                    </strong>

                    <SliderNavigation
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />
                  </div>

                  {accounts.map((account) => (
                    <SwiperSlide key={account.id}>
                      <AccountCard data={account} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
