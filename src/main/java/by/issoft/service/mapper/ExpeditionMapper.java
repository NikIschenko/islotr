package by.issoft.service.mapper;

import by.issoft.domain.*;
import by.issoft.service.dto.ExpeditionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Expedition} and its DTO {@link ExpeditionDTO}.
 */
@Mapper(componentModel = "spring", uses = {UnitMapper.class})
public interface ExpeditionMapper extends EntityMapper<ExpeditionDTO, Expedition> {

    @Mapping(source = "unit.id", target = "unitId")
    ExpeditionDTO toDto(Expedition expedition);

    @Mapping(source = "unitId", target = "unit")
    Expedition toEntity(ExpeditionDTO expeditionDTO);

    default Expedition fromId(Long id) {
        if (id == null) {
            return null;
        }
        Expedition expedition = new Expedition();
        expedition.setId(id);
        return expedition;
    }
}
