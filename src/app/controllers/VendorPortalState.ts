export default class VendorPortalState{
    static sharedStateInstance = new VendorPortalState();
    quotation: any;
    purchaseOrder: any;
    goodsReceipt: any;
    invoice: any;
    paymentOverdue: any;
    creditMemo: any;
    getQuotation(): any{
        return this.quotation;
    }
    getPurchaseOrder(): any{
        return this.purchaseOrder;
    }
    getCreditMemo():any{
        return this.creditMemo;
    }
    getInvoice(): any{
        return this.invoice;
    }
    getPaymentOverdue(): any{
        return this.paymentOverdue;
    }
    getGoodsReceipt(): any{
        return this.goodsReceipt;
    }
    setQuotation(quotation: any){
        this.quotation = quotation;
    }
    setPurchaseOrder(purchaseOrder: any){
        this.purchaseOrder = purchaseOrder;
    }
    setCreditMemo(creditMemo: any){
        this.creditMemo = creditMemo;
    }
    setInvoice(invoice: any){
        this.invoice = invoice;
    }
    setPaymentOverdue(paymentOverdue: any){
        this.paymentOverdue = paymentOverdue;
    }
    setGoodsReceipt(goodsReceipt: any){
        this.goodsReceipt = goodsReceipt;
    }
}