export default class PortalState {
    static sharedStateInstance = new PortalState();
    inquiry: any = null;
    invoice: any = null;
    salesData: any = null;
    paymentAging: any = null;
    delivery: any = null;
    creditMemo: any = null;
    setInvoice(invoice){
        this.invoice = invoice;
    }
    setInquiry(inquiry){
        this.inquiry = inquiry;
    }
    setSalesData(salesData){
        this.salesData = salesData;
    }
    setPaymentAging(paymentAging){
        this.paymentAging = paymentAging;
    }
    setCreditMemo(creditMemo){
        this.creditMemo = creditMemo;
    }
    setDelivery(delivery){
        this.delivery = delivery;
    }
    getInvoice(){
        return this.invoice;
    }
    getInquiry(){
        return this.inquiry;
    }
    getSalesData(){
        return this.salesData;
    }
    getPaymentAging(){
        return this.paymentAging;
    }
    getCreditMemo(){
        return this.creditMemo;
    }
    getDelivery(){
        return this.delivery;
    }

}