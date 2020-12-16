export default class MaintenancePortalState{
    static sharedStateInstance = new MaintenancePortalState();
    order: any;
    notification: any;
    getOrder(): any{
        return this.order;
    }
    getNotification(): any{
        return this.notification;
    }
    setOrder(order: any){
        this.order = order;
    }
    setNotification(notification: any){
        this.notification = notification;
    }
}