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
    long vehicleId;
    String vehicleName;
    String vehicleNumber;
    String scheduledOn;
    String status;
    String billAmount;
    String billStatus;

}
