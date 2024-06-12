import DeliveryService from "@Src/services/delivery/DeliveryService";
import {DeliveryReq} from "@Src/services/delivery/model";

const queryKeys = {
  findOne: ['delivery'] as const,
};

const queryOptions = {
  findOne: () => ({
    queryKey: queryKeys.findOne,
    queryFn: () => DeliveryService.getDelivery(),
  }),
  update: () => ({
    mutationFn: (data: DeliveryReq) => DeliveryService.updateDelivery(data),
  }),
}

export default queryOptions;