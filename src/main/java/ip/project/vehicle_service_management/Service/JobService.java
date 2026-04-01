package ip.project.vehicle_service_management.Service;

import ip.project.vehicle_service_management.Model.Job;
import ip.project.vehicle_service_management.Repository.JobRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {
    private final JobRepo jobRepo;

    public JobService(JobRepo jobRepo) {
        this.jobRepo = jobRepo;
    }

    public List<Job> getAllJobs() {
        return jobRepo.findAll();
    }

    public Job getJobById(Long id) {
        return jobRepo.findById(id).orElse(null);
    }

    public Job addJob(Job job) {
        return jobRepo.save(job);
    }

    public Job updateJob(Job job) {
        return jobRepo.save(job);
    }

    public void deleteJob(Long id) {
        jobRepo.deleteById(id);
    }
}
