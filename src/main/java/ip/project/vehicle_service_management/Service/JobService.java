package ip.project.vehicle_service_management.Service;

import ip.project.vehicle_service_management.Model.Customer;
import ip.project.vehicle_service_management.Model.Job;
import ip.project.vehicle_service_management.Repository.JobRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {
    final private JobRepo jobrepo;
    @Autowired
    private JobService(JobRepo jobrepo){
        this.jobrepo = jobrepo;
    }
    public List<Job> getAllJobs(){
        return jobrepo.findAll();
    }
    public Job getJob(Long id){
        return jobrepo.getById(id);
    }
    public Job addJob(Job job){
        return jobrepo.save(job);
    }
    public void deleteJob(Long id){
        jobrepo.deleteById(id);
    }
}
