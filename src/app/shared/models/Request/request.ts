export class Request {
    Oid!:  string;
    token!: any;
    sellerId!: string;
    status!: string;
    orderId!: string;
    paymentStatus!: string;
    orderStatus!: string;
    trackingNumber!: string;
    amount!: string;
    orderNumbers: any[] = [];
    productId!: string;
    courierName!: string;
    selectedReportType: any;
    CategoryId! : any;
    returnstatus!: any;
    imageId! : string | null;
}
