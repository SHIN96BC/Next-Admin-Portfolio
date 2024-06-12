import {DeliveryReq} from "@Src/services/delivery/model";
import {useMutation, useQuery} from "@tanstack/react-query";
import queryOptions from "@Src/services/delivery/queries";

export function useFindByDelivery() {
  return useQuery(queryOptions.findOne());
}

export function useUpdateDelivery() {
  return useMutation(queryOptions.update());
}