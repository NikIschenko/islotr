package by.issoft.domain;



import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Language.
 */
@Entity
@Table(name = "language")
public class Language implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 1, max = 15)
    @Column(name = "title", length = 15)
    private String title;

    @ManyToMany
    @JoinTable(name = "language_unit",
               joinColumns = @JoinColumn(name = "language_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "unit_id", referencedColumnName = "id"))
    private Set<Unit> units = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Language title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<Unit> getUnits() {
        return units;
    }

    public Language units(Set<Unit> units) {
        this.units = units;
        return this;
    }

    public Language addUnit(Unit unit) {
        this.units.add(unit);
        unit.getLanguages().add(this);
        return this;
    }

    public Language removeUnit(Unit unit) {
        this.units.remove(unit);
        unit.getLanguages().remove(this);
        return this;
    }

    public void setUnits(Set<Unit> units) {
        this.units = units;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Language)) {
            return false;
        }
        return id != null && id.equals(((Language) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Language{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
