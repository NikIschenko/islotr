package by.issoft.service.dto;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the {@link by.issoft.domain.Unit} entity.
 */
public class UnitDTO implements Serializable {

    private Long id;

    private LocalDate hireDate;

    @Lob
    private String biography;

    @Min(value = 0)
    @Max(value = 32)
    private Integer numberOfTeeth;


    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getHireDate() {
        return hireDate;
    }

    public void setHireDate(LocalDate hireDate) {
        this.hireDate = hireDate;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public Integer getNumberOfTeeth() {
        return numberOfTeeth;
    }

    public void setNumberOfTeeth(Integer numberOfTeeth) {
        this.numberOfTeeth = numberOfTeeth;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UnitDTO unitDTO = (UnitDTO) o;
        if (unitDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), unitDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UnitDTO{" +
            "id=" + getId() +
            ", hireDate='" + getHireDate() + "'" +
            ", biography='" + getBiography() + "'" +
            ", numberOfTeeth=" + getNumberOfTeeth() +
            ", user=" + getUserId() +
            "}";
    }
}
