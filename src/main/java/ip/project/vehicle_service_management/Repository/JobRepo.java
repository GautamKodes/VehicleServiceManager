package ip.project.vehicle_service_management.Repository;

import ip.project.vehicle_service_management.Model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepo extends JpaRepository<Job, Long> {
}
