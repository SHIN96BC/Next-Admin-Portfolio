import Service from "@Src/services/Service";
import {DeliveryReq, DeliveryRes} from "@Src/services/delivery/model";

class DeliveryService extends Service {
  getDelivery() {
    return this.http.get<DeliveryRes>('/store/deliveryFees');
  }

  updateDelivery(data: DeliveryReq) {
    return this.http.patch<DeliveryReq, null>('/store/deliveryFees', data)
  }
}

const deliveryService = new DeliveryService();

export default deliveryService;