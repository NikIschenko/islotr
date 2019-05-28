package by.issoft.service;

import by.issoft.service.dto.ExpeditionDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link by.issoft.domain.Expedition}.
 */
public interface ExpeditionService {

    /**
     * Save a expedition.
     *
     * @param expeditionDTO the entity to save.
     * @return the persisted entity.
     */
    ExpeditionDTO save(ExpeditionDTO expeditionDTO);

    /**
     * Get all the expeditions.
     *
     * @return the list of entities.
     */
    List<ExpeditionDTO> findAll();


    /**
     * Get the "id" expedition.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ExpeditionDTO> findOne(Long id);

    /**
     * Delete the "id" expedition.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
