package by.issoft.service;

import by.issoft.service.dto.UnitDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link by.issoft.domain.Unit}.
 */
public interface UnitService {

    /**
     * Save a unit.
     *
     * @param unitDTO the entity to save.
     * @return the persisted entity.
     */
    UnitDTO save(UnitDTO unitDTO);

    /**
     * Get all the units.
     *
     * @return the list of entities.
     */
    List<UnitDTO> findAll();


    /**
     * Get the "id" unit.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UnitDTO> findOne(Long id);

    /**
     * Delete the "id" unit.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
