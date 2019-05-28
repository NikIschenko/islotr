package by.issoft.service.mapper;

import by.issoft.domain.*;
import by.issoft.service.dto.UnitDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Unit} and its DTO {@link UnitDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface UnitMapper extends EntityMapper<UnitDTO, Unit> {

    @Mapping(source = "user.id", target = "userId")
    UnitDTO toDto(Unit unit);

    @Mapping(source = "userId", target = "user")
    @Mapping(target = "expeditions", ignore = true)
    @Mapping(target = "images", ignore = true)
    @Mapping(target = "languages", ignore = true)
    Unit toEntity(UnitDTO unitDTO);

    default Unit fromId(Long id) {
        if (id == null) {
            return null;
        }
        Unit unit = new Unit();
        unit.setId(id);
        return unit;
    }
}
