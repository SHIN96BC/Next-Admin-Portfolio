type CommencementDate = string;
type BaseFee = number;
type KmFee = number;

export interface DeliveryRes {
  current: {
    commencementDate: CommencementDate;
    baseFee: BaseFee;
    kmFee: KmFee;
  };
  reserved: {
    commencementDate: CommencementDate;
    baseFee: BaseFee;
    kmFee: KmFee;
  };
}

export interface DeliveryReq {
  commencementDate: CommencementDate;
  baseFee: BaseFee;
  kmFee: KmFee;
}