package by.issoft.service.dto;
import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the {@link by.issoft.domain.Image} entity.
 */
public class ImageDTO implements Serializable {

    private Long id;

    @Lob
    private byte[] image;

    private String imageContentType;
    private ZonedDateTime setUpDate;


    private Long unitId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public ZonedDateTime getSetUpDate() {
        return setUpDate;
    }

    public void setSetUpDate(ZonedDateTime setUpDate) {
        this.setUpDate = setUpDate;
    }

    public Long getUnitId() {
        return unitId;
    }

    public void setUnitId(Long unitId) {
        this.unitId = unitId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ImageDTO imageDTO = (ImageDTO) o;
        if (imageDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), imageDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ImageDTO{" +
            "id=" + getId() +
            ", image='" + getImage() + "'" +
            ", setUpDate='" + getSetUpDate() + "'" +
            ", unit=" + getUnitId() +
            "}";
    }
}
