import { TokenMetadata, Transaction } from '../types';
import {
  priceToPoint,
  toNonDivisibleNumber,
  toPrecision,
  registerAccountOnToken,
} from '../utils';
import { ONE_YOCTO_NEAR, WRAP_NEAR_CONTRACT_ID, config } from '../constant';
import {
  nearDepositTransaction,
  ftGetStorageBalance,
  refDCLSwapViewFunction,
} from '../ref';

export interface UserOrderInfo {
  order_id: string;
  owner_id: string;
  pool_id: string;
  point: number;
  sell_token: string;
  created_at: string;
  original_amount: string;
  remain_amount: string; // 0 means history order: ;
  cancel_amount: string;
  // amount through ft_transfer_call

  original_deposit_amount: string;
  // earn token amount through swap before actual place order

  swap_earn_amount: string;
  buy_token: string;
  unclaimed_amount: string; // claim will push it to inner account
  bought_amount: string; // accumalated amount into inner account
}

export const list_history_orders = (AccountId: string) => {
  return refDCLSwapViewFunction({
    methodName: 'list_history_orders',
    args: {
      account_id: AccountId,
    },
  });
};

export const list_active_orders = (AccountId: string) => {
  return refDCLSwapViewFunction({
    methodName: 'list_active_orders',
    args: {
      account_id: AccountId,
    },
  });
};

export const get_order = (order_id: string) => {
  return refDCLSwapViewFunction({
    methodName: 'get_order',
    args: {
      order_id,
    },
  });
};

export const find_order = async ({
  pool_id,
  point,
  AccountId,
}: {
  pool_id: string;
  point: number;
  AccountId: string;
}) => {
  return refDCLSwapViewFunction({
    methodName: 'find_order',
    args: {
      account_id: AccountId,
      pool_id,
      point,
    },
  }) as Promise<UserOrderInfo>;
};
