package by.issoft.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Objects;

import by.issoft.domain.enumeration.Complexity;

/**
 * A Expedition.
 */
@Entity
@Table(name = "expedition")
public class Expedition implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "complexity")
    private Complexity complexity;

    @Column(name = "dispatch_time")
    private ZonedDateTime dispatchTime;

    @Column(name = "dead_line")
    private LocalDate deadLine;

    @DecimalMin(value = "0")
    @DecimalMax(value = "1")
    @Column(name = "rate")
    private Double rate;

    @ManyToOne
    @JsonIgnoreProperties("expeditions")
    private Unit unit;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Complexity getComplexity() {
        return complexity;
    }

    public Expedition complexity(Complexity complexity) {
        this.complexity = complexity;
        return this;
    }

    public void setComplexity(Complexity complexity) {
        this.complexity = complexity;
    }

    public ZonedDateTime getDispatchTime() {
        return dispatchTime;
    }

    public Expedition dispatchTime(ZonedDateTime dispatchTime) {
        this.dispatchTime = dispatchTime;
        return this;
    }

    public void setDispatchTime(ZonedDateTime dispatchTime) {
        this.dispatchTime = dispatchTime;
    }

    public LocalDate getDeadLine() {
        return deadLine;
    }

    public Expedition deadLine(LocalDate deadLine) {
        this.deadLine = deadLine;
        return this;
    }

    public void setDeadLine(LocalDate deadLine) {
        this.deadLine = deadLine;
    }

    public Double getRate() {
        return rate;
    }

    public Expedition rate(Double rate) {
        this.rate = rate;
        return this;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public Unit getUnit() {
        return unit;
    }

    public Expedition unit(Unit unit) {
        this.unit = unit;
        return this;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Expedition)) {
            return false;
        }
        return id != null && id.equals(((Expedition) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Expedition{" +
            "id=" + getId() +
            ", complexity='" + getComplexity() + "'" +
            ", dispatchTime='" + getDispatchTime() + "'" +
            ", deadLine='" + getDeadLine() + "'" +
            ", rate=" + getRate() +
            "}";
    }
}
