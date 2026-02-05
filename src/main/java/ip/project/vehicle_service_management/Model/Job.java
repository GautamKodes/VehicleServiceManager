package ip.project.vehicle_service_management.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long jobId;
    long customerId;
    String customerName;
    int customerMobileNum;
    long vehicleId;
    String vehicleName;
    String vehicleNumber;
    String scheduledOn;
    String status;
    String billAmount;
    String billStatus;

    public Job(){};
    //setters
    public void setVehicleName(String name){
        this.vehicleName=name;
    }
    public void setVehicleNumber(String number){
        this.vehicleNumber=number;
    }
    public void setScheduledOn(String date){
        this.scheduledOn=date;
    }
    public void setBillAmount(String amount){
        this.billAmount=amount;
    }
    //getters
    public String getBillAmount(){
        return billAmount;
    }


}
