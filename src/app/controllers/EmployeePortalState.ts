export default class EmployeePortalState {
    static sharedStateInstance = new EmployeePortalState();
    leaveData: any = null;
    salaryData: any = null;
    setLeaveData(leaveData){
        this.leaveData = leaveData;
    }
    setSalaryData(salaryData){
        this.salaryData = salaryData;
    }
    getLeaveData(){
        return this.leaveData;
    }
    getSalaryData(){
        return this.salaryData;
    }
}